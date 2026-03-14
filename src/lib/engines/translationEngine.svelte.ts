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

const LANGUAGE_CACHE_KEY = "language_cache";

/**
 * Initializes the translation engine.
 * * @param appRuntime - The Paraglide runtime from the consuming project.
 * @returns An async initialization function that accepts an optional database preference.
 */
export function createTranslationEngine<T extends string>(appRuntime: ParaglideRuntimeType<T>) {
	const { locales, getLocale, setLocale } = appRuntime;

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
		const candidate = lang.split(",")[0].split("-")[0].trim().toLowerCase();
		return (locales as readonly string[]).includes(candidate) ? (candidate as Locale) : null;
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
		if (!targetLocale && typeof window !== "undefined") {
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
