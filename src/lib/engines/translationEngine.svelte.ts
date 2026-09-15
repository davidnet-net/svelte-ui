/**
 * Core Translation Engine
 *
 * Provides a unified wrapper around Paraglide JS to handle language switching,
 * locale caching, and regional formatting (timezones, date formats, etc.)
 * across the application.
 */

import { setLocale as internalSetLocale } from "$lib/paraglide/runtime.js";
import { getCookie, setCookie } from "../utils/cookies";
import { toast } from "./toastEngine.svelte";

/**
 * Defines the required shape of a Paraglide JS runtime module.
 * @template T - A string literal union of supported locales (e.g., 'en-us' | 'nl').
 */
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

// Internal references to the consumer's Paraglide runtime functions,
// populated once createTranslationEngine is invoked.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let consumerSetLocale: ((locale: any) => void) | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let consumerGetLocale: (() => any) | null = null;

/**
 * Globally updates the application language, synchronizes local cache,
 * and triggers a hard reload to apply routing changes.
 *
 * @param newLocale - The target locale string to switch to (e.g., 'en-us', 'nl').
 */
export function setLanguage(newLocale: string): void {
	// 1. Immediately write to ALL storage mechanisms to prevent state mismatch on reload
	// Passes 365 days to your custom setCookie utility
	setCookie(LANGUAGE_CACHE_KEY, newLocale, 365);

	if (typeof window !== "undefined") {
		// Sync Paraglide's configured localStorage key!
		localStorage.setItem("language", newLocale);
		document.documentElement.lang = newLocale;
	}

	// 2. Guard clause: Prevent infinite loops if the language is already active
	if (consumerGetLocale && consumerGetLocale() === newLocale) {
		return;
	}

	toast(
		"Reloading page!",
		"To apply the language we need to reload the page.",
		"translate",
		4000,
		"subtle"
	);

	// Trigger the active Paraglide runtime
	if (consumerSetLocale) {
		consumerSetLocale(newLocale);
	} else {
		console.warn("[i18n] Consumer engine not booted, falling back to internal setter.");
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		internalSetLocale(newLocale as any);
	}

	// Force a hard browser reload to sync SvelteKit SSR with the new cookie
	if (typeof window !== "undefined") {
		setTimeout(() => {
			window.location.reload();
		}, 100);
	}
}

/**
 * Initializes the translation engine by binding the consumer's Paraglide runtime.
 *
 * @param appRuntime - The Paraglide runtime object from the consuming project.
 * @returns An asynchronous initialization function to resolve the initial locale.
 */
export function createTranslationEngine<T extends string>(appRuntime: ParaglideRuntimeType<T>) {
	const { locales, getLocale, setLocale } = appRuntime;

	consumerSetLocale = setLocale;
	consumerGetLocale = getLocale;

	if (!Array.isArray(locales) || locales.length === 0) {
		throw new Error("createTranslationEngine: 'locales' must be a non-empty array.");
	}

	type Locale = T;

	const handleLocaleChange = (newLocale: Locale) => {
		// Prevent redundant state application if it matches current runtime locale
		if (getLocale() === newLocale) return;

		//eslint-disable-next-line @typescript-eslint/no-explicit-any
		internalSetLocale(newLocale as any);

		// Keep storages synced on internal changes
		setCookie(LANGUAGE_CACHE_KEY, newLocale, 365);
		if (typeof window !== "undefined") {
			localStorage.setItem("language", newLocale);
			document.documentElement.lang = newLocale;
		}
	};

	if (appRuntime.setLocale !== internalSetLocale) {
		//eslint-disable-next-line @typescript-eslint/no-explicit-any
		internalSetLocale(appRuntime.getLocale() as any);

		if (typeof appRuntime.onSetLocale === "function") {
			appRuntime.onSetLocale(handleLocaleChange);
		} else {
			console.warn(
				"[i18n] onSetLocale not found on appRuntime. Side effects will only apply on boot."
			);
		}
	}

	async function validateLanguage(lang: string | null): Promise<Locale | null> {
		if (!lang) return null;
		const candidate = lang.split(",")[0]?.trim().toLowerCase();

		if (!candidate) return null;

		// 1. Try for an exact match first (e.g., "en-us" matches "en-us")
		if ((locales as readonly string[]).includes(candidate)) {
			return candidate as Locale;
		}

		// 2. Fallback: If no exact match, try matching just the base language
		// Example: browser requests "en-GB", we match it to our base "en-us"
		const baseCandidate = candidate.split("-")[0];
		const looseMatch = (locales as readonly string[]).find(
			(l) => l.split("-")[0] === baseCandidate
		);

		return looseMatch ? (looseMatch as Locale) : null;
	}

	/**
	 * Asynchronously resolves and applies the optimal locale based on local cache,
	 * database preferences, and browser defaults.
	 *
	 * @param databasePreference - An optional language string fetched from the user's database profile.
	 */
	return async function initializeTranslationEngine(
		databasePreference?: string | null
	): Promise<void> {
		let targetLocale: Locale | null = null;

		// Priority 1: Local Cache (Cookie first, then LocalStorage)
		const cachedLanguage =
			getCookie(LANGUAGE_CACHE_KEY) ||
			(typeof window !== "undefined" ? localStorage.getItem("language") : null);
		targetLocale = await validateLanguage(cachedLanguage);

		// Priority 2: Database Preference (if no local cache exists)
		if (!targetLocale && databasePreference) {
			targetLocale = await validateLanguage(databasePreference);
		}

		// Priority 3: Browser Navigator Fallback
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

		// Apply resolved locale only if it differs from the current active runtime locale
		if (targetLocale && targetLocale !== getLocale()) {
			if (typeof appRuntime.onSetLocale !== "function") {
				handleLocaleChange(targetLocale);
			}
			setLocale(targetLocale);
		} else if (typeof document !== "undefined") {
			document.documentElement.lang = getLocale();
		}
	};
}

// -----------------------------------------------------------------------------
// Regional Settings & Formatting Engine
// -----------------------------------------------------------------------------

let currentTimezone: string | null = null;
let currentFirstDayOfWeek: string | null = null;
let currentDateFormat: string | null = null;

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

export function setTimezone(tz: string): void {
	if (validTimezones.includes(tz)) {
		currentTimezone = tz;
		setCookie(TIMEZONE_CACHE_KEY, tz, 365);
	} else {
		console.warn(`[i18n] Invalid timezone attempted: ${tz}`);
	}
}

export function getTimezone(): string {
	if (!currentTimezone) {
		const cached = getCookie(TIMEZONE_CACHE_KEY);
		const browserTz =
			typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC";

		const candidate = cached || browserTz;
		currentTimezone = validTimezones.includes(candidate) ? candidate : "UTC";
	}
	return currentTimezone;
}

export function setFirstDayOfWeek(dayValue: string): void {
	const isValid = validDaysOfWeek.some((day) => day.value === dayValue.toLowerCase());
	if (isValid) {
		currentFirstDayOfWeek = dayValue.toLowerCase();
		setCookie(FIRSTDAYOFWEEK_CACHE_KEY, currentFirstDayOfWeek, 365);
	} else {
		console.warn(`[i18n] Invalid day of week attempted: ${dayValue}`);
	}
}

export function getFirstDayOfWeek(): string {
	if (!currentFirstDayOfWeek) {
		const cached = getCookie(FIRSTDAYOFWEEK_CACHE_KEY);
		const isValid = cached && validDaysOfWeek.some((day) => day.value === cached.toLowerCase());
		currentFirstDayOfWeek = isValid ? cached.toLowerCase() : "monday";
	}
	return currentFirstDayOfWeek;
}

export function setDateFormat(format: string): void {
	if (validDateFormats.includes(format)) {
		currentDateFormat = format;
		setCookie(DATEFORMAT_CACHE_KEY, format, 365);
	} else {
		console.warn(`[i18n] Invalid date format attempted: ${format}`);
	}
}

export function getDateFormat(): string {
	if (!currentDateFormat) {
		const cached = getCookie(DATEFORMAT_CACHE_KEY);
		currentDateFormat = cached && validDateFormats.includes(cached) ? cached : "YYYY-MM-DD";
	}
	return currentDateFormat;
}

function _formatUnix(ms: number, includeTime: boolean): string {
	if (!ms || isNaN(ms)) return "";

	const date = new Date(ms);
	const tz = getTimezone();
	const dateFormat = getDateFormat();

	const options: Intl.DateTimeFormatOptions = {
		timeZone: tz,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		...(includeTime && { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })
	};

	const formatter = new Intl.DateTimeFormat("en-US", options);
	const parts = formatter.formatToParts(date);

	const year = parts.find((p) => p.type === "year")?.value ?? "1970";
	const month = parts.find((p) => p.type === "month")?.value ?? "01";
	const day = parts.find((p) => p.type === "day")?.value ?? "01";

	let result = dateFormat.replace("YYYY", year).replace("MM", month).replace("DD", day);

	if (includeTime) {
		const hour = parts.find((p) => p.type === "hour")?.value ?? "00";
		const minute = parts.find((p) => p.type === "minute")?.value ?? "00";
		const second = parts.find((p) => p.type === "second")?.value ?? "00";
		result += ` ${hour}:${minute}:${second}`;
	}

	return result;
}

export function formatUnixMsToPreferred(ms: number, includeTime = false): string {
	return _formatUnix(ms, includeTime);
}

export function formatUnixSecToPreferred(seconds: number, includeTime = false): string {
	if (!seconds || isNaN(seconds)) return "";
	return _formatUnix(seconds * 1000, includeTime);
}
