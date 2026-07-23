//*
//* Translation Engine for Davidnet
//* Uses paraglide
//*

//! This module is AI generated and really messy. But if it works dont touch it!

import { setLocale as internalSetLocale } from "$lib/paraglide/runtime.js";

import { getCookie, setCookie } from "../utils/cookies";

export interface ParaglideRuntimeType<T extends string> {
	locales: readonly T[];
	getLocale: () => T;
	setLocale: (locale: T) => void;
	onSetLocale?: (callback: (newLocale: T) => void) => void;
}

export const LANGUAGE_CACHE_KEY = "language_cache";
export const TIMEZONE_CACHE_KEY = "timezone_cache";
export const FIRSTDAYOFWEEK_CACHE_KEY = "first_day_of_week_cache";
export const DATEFORMAT_CACHE_KEY = "date_format_cache";

// We will store the consumer's setLocale function here when the engine boots
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let consumerSetLocale: ((locale: any) => void) | null = null;

/**
 * Master function to update the language across the consumer app, library components, and cache.
 * @param newLocale - The locale to switch to (e.g., 'en', 'nl')
 */
export function setLanguage(newLocale: string) {
	// 1. FORCE THE CACHE UPDATE FIRST
	setCookie(LANGUAGE_CACHE_KEY, newLocale);

	if (typeof document !== "undefined") {
		document.documentElement.lang = newLocale;
	}

	// 2. Trigger the Paraglide runtimes
	if (consumerSetLocale) {
		consumerSetLocale(newLocale);
	} else {
		console.warn("[i18n] Consumer engine not booted, falling back to internal setter.");
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		internalSetLocale(newLocale as any);
	}

	// 3. Force a hard browser reload so the SvelteKit server catches the new cookie
	if (typeof window !== "undefined") {
		setTimeout(() => {
			window.location.reload();
		}, 100);
	}
}

/**
 * Initializes the translation engine.
 * * @param appRuntime - The Paraglide runtime from the consuming project.
 * @returns An async initialization function that accepts an optional database preference.
 */
export function createTranslationEngine<T extends string>(appRuntime: ParaglideRuntimeType<T>) {
	const { locales, getLocale, setLocale } = appRuntime;

	// Save the consumer's setter so our UI components can reach it via setLanguage()
	consumerSetLocale = setLocale;

	if (!Array.isArray(locales) || locales.length === 0) {
		throw new Error("createTranslationEngine: 'locales' must be a non-empty array.");
	}

	type Locale = T;

	const handleLocaleChange = (newLocale: Locale) => {
		//eslint-disable-next-line @typescript-eslint/no-explicit-any
		internalSetLocale(newLocale as any);
		if (typeof document !== "undefined") {
			document.documentElement.lang = newLocale;
		}
		setCookie(LANGUAGE_CACHE_KEY, newLocale);
	};

	// --- Synchronization & Cache Updating ---
	if (appRuntime.setLocale !== internalSetLocale) {
		//eslint-disable-next-line @typescript-eslint/no-explicit-any
		internalSetLocale(appRuntime.getLocale() as any);

		if (typeof appRuntime.onSetLocale === "function") {
			// Leverage Paraglide's native subscriber pattern
			appRuntime.onSetLocale(handleLocaleChange);
		} else {
			// We cannot mutate the read-only ES module namespace here.
			// Warn the developer and fallback to manual sync during initialization.
			console.warn(
				"[i18n] onSetLocale not found on appRuntime. Side effects will only apply on boot."
			);
		}
	}

	async function validateLanguage(lang: string | null): Promise<Locale | null> {
		if (!lang) return null;
		const candidate = lang.split(",")[0]?.split("-")[0]?.trim().toLowerCase();
		return candidate && (locales as readonly string[]).includes(candidate)
			? (candidate as Locale)
			: null;
	}

	/**
	 * Resolves the best language match based on DB, Cache, or Browser.
	 * * @param databasePreference - The language string fetched from the database API.
	 */
	return async function initializeTranslationEngine(databasePreference?: string | null) {
		let targetLocale: Locale | null = null;

		// 1. Database Priority (if provided after DB fetch)
		if (databasePreference) {
			targetLocale = await validateLanguage(databasePreference);
		}

		// 2. Cache Priority (Cookie check, replaces localStorage concept)
		if (!targetLocale) {
			const cachedLanguage = getCookie(LANGUAGE_CACHE_KEY);
			targetLocale = await validateLanguage(cachedLanguage);
		}

		// 3. Browser Navigator Fallback
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!targetLocale && typeof window !== "undefined" && navigator?.languages) {
			for (const lang of navigator.languages) {
				const validated = await validateLanguage(lang);
				if (validated) {
					targetLocale = validated;
					break;
				}
			}
		}

		// Apply findings
		if (targetLocale && targetLocale !== getLocale()) {
			// Guarantee side-effects are fired if Paraglide's subscriber is missing
			if (typeof appRuntime.onSetLocale !== "function") {
				handleLocaleChange(targetLocale);
			}
			setLocale(targetLocale);
		} else if (typeof document !== "undefined") {
			document.documentElement.lang = getLocale();
		}
	};
}

// --- Formatting & Regional Settings Engine ---

// In-memory state so we don't spam the cookie parser on every request
let currentTimezone: string | null = null;
let currentFirstDayOfWeek: string | null = null;
let currentDateFormat: string | null = null;

// Valid reference lists based on your inputs
export const validDaysOfWeek = [
	{ value: "monday", label: "Monday" },
	{ value: "tuesday", label: "Tuesday" },
	{ value: "wednesday", label: "Wednesday" },
	{ value: "thursday", label: "Thursday" },
	{ value: "friday", label: "Friday" },
	{ value: "saturday", label: "Saturday" },
	{ value: "sunday", label: "Sunday" }
];

export const validDateFormats = ["YYYY-MM-DD", "DD-MM-YYYY", "MM-DD-YYYY"];

export const validTimezones =
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	typeof Intl !== "undefined" && Intl.supportedValuesOf
		? Intl.supportedValuesOf("timeZone")
		: ["UTC"];

// --- 1. TIMEZONE ---

export function setTimezone(tz: string) {
	if (validTimezones.includes(tz)) {
		currentTimezone = tz;
		setCookie(TIMEZONE_CACHE_KEY, tz);
	} else {
		console.warn(`[i18n] Invalid timezone attempted: ${tz}`);
	}
}

export function getTimezone(): string {
	if (!currentTimezone) {
		// Read from cache, fallback to browser's native timezone, final fallback to UTC
		const cached = getCookie(TIMEZONE_CACHE_KEY);
		const browserTz =
			typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC";

		const candidate = cached || browserTz;
		currentTimezone = validTimezones.includes(candidate) ? candidate : "UTC";
	}
	return currentTimezone;
}

// --- 2. FIRST DAY OF WEEK ---

export function setFirstDayOfWeek(dayValue: string) {
	const isValid = validDaysOfWeek.some((day) => day.value === dayValue.toLowerCase());
	if (isValid) {
		currentFirstDayOfWeek = dayValue.toLowerCase();
		setCookie(FIRSTDAYOFWEEK_CACHE_KEY, currentFirstDayOfWeek);
	} else {
		console.warn(`[i18n] Invalid day of week attempted: ${dayValue}`);
	}
}

export function getFirstDayOfWeek(): string {
	if (!currentFirstDayOfWeek) {
		const cached = getCookie(FIRSTDAYOFWEEK_CACHE_KEY);
		const isValid = cached && validDaysOfWeek.some((day) => day.value === cached.toLowerCase());

		// Defaults to monday if cache is empty or invalid
		currentFirstDayOfWeek = isValid ? cached.toLowerCase() : "monday";
	}
	return currentFirstDayOfWeek;
}

// --- 3. DATE FORMAT ---

export function setDateFormat(format: string) {
	if (validDateFormats.includes(format)) {
		currentDateFormat = format;
		setCookie(DATEFORMAT_CACHE_KEY, format);
	} else {
		console.warn(`[i18n] Invalid date format attempted: ${format}`);
	}
}

export function getDateFormat(): string {
	if (!currentDateFormat) {
		const cached = getCookie(DATEFORMAT_CACHE_KEY);

		// Defaults to YYYY-MM-DD if cache is empty or invalid
		currentDateFormat = cached && validDateFormats.includes(cached) ? cached : "YYYY-MM-DD";
	}
	return currentDateFormat;
}

// -------------------------------------------------
//  UTILS - UTILS - UTILS - UTILS - UTILS - UTILS
// -------------------------------------------------

/**
 * Internal helper to handle the actual timezone and formatting logic.
 * Expects milliseconds.
 */
function _formatUnix(ms: number, includeTime: boolean): string {
	if (!ms || isNaN(ms)) return "";

	const date = new Date(ms);
	const tz = getTimezone();
	const dateFormat = getDateFormat();

	// Use Intl.DateTimeFormat to lock in the correct timezone offsets
	const options: Intl.DateTimeFormatOptions = {
		timeZone: tz,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		...(includeTime && { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })
	};

	// We use 'en-US' as the base locale just to get predictable parts we can parse,
	// but the actual time calculated is strictly bound to the target timezone.
	const formatter = new Intl.DateTimeFormat("en-US", options);
	const parts = formatter.formatToParts(date);

	// Safely extract the timezone-adjusted values
	const year = parts.find((p) => p.type === "year")?.value ?? "1970";
	const month = parts.find((p) => p.type === "month")?.value ?? "01";
	const day = parts.find((p) => p.type === "day")?.value ?? "01";

	// Swap out the user's preferred format string (e.g., YYYY-MM-DD -> 2024-05-14)
	let result = dateFormat.replace("YYYY", year).replace("MM", month).replace("DD", day);

	// Append the exact time if requested
	if (includeTime) {
		const hour = parts.find((p) => p.type === "hour")?.value ?? "00";
		const minute = parts.find((p) => p.type === "minute")?.value ?? "00";
		const second = parts.find((p) => p.type === "second")?.value ?? "00";

		// Formats as "YYYY-MM-DD HH:MM:SS"
		result += ` ${hour}:${minute}:${second}`;
	}

	return result;
}

/**
 * Converts a Unix timestamp in MILLISECONDS to a formatted string
 * respecting the user's cached timezone and date format.
 * @param ms - The Unix timestamp in milliseconds.
 * @param includeTime - Whether to append the time (HH:MM:SS) to the output.
 */
export function formatUnixMsToPreferred(ms: number, includeTime = false): string {
	return _formatUnix(ms, includeTime);
}

/**
 * Converts a Unix timestamp in SECONDS to a formatted string
 * respecting the user's cached timezone and date format.
 * @param seconds - The Unix timestamp in seconds.
 * @param includeTime - Whether to append the time (HH:MM:SS) to the output.
 */
export function formatUnixSecToPreferred(seconds: number, includeTime = false): string {
	if (!seconds || isNaN(seconds)) return "";
	return _formatUnix(seconds * 1000, includeTime);
}
