import manifest from "$lib/internal/manifests/version-manifest.json";

import { getCookie, setCookie } from "../utils/cookies";
import { initAppState } from "./appStateEngine.svelte";
import { identityState, initIdentityEngine } from "./identityEngine.svelte";
import { isValidTheme, setTheme, type themeNames } from "./themeEngine.svelte";
import {
	createTranslationEngine,
	LANGUAGE_CACHE_KEY,
	type ParaglideRuntimeType,
	setDateFormat,
	setFirstDayOfWeek,
	setLanguage,
	setTimezone
} from "./translationEngine.svelte";

export async function init<T extends string>(paraglideRuntime: ParaglideRuntimeType<T>) {
	// TODO: Init phases that are based on caches should be moved to SSR to prevent flashes of wrong styles or languages!

	const hydrationEnd = performance.now();
	console.groupCollapsed("Davidnet Design System - information");
	console.log("version: " + manifest.version);
	console.log("commitUrl: " + manifest.commitUrl);
	console.log("commitHash: " + manifest.commitHash);
	console.log("buildTime: " + manifest.buildTime);
	console.groupEnd();

	// App State Setup
	await initAppState();
	console.debug("[AppShell] Inited appStateEngine.");

	// Theme Setup (Cache Phase)
	let theme_cache = getCookie("theme_cache");
	if (!isValidTheme(theme_cache)) {
		console.debug("[AppShell] Created new theme_cache.");
		setCookie("theme_cache", "system");
		theme_cache = "system";
	}
	setTheme(theme_cache as themeNames);
	console.debug(`[AppShell] Set theme ${theme_cache} based on theme_cache`);

	// Translation Engine Setup (Cache Phase)
	const runTranslationCheck = createTranslationEngine(paraglideRuntime);
	await runTranslationCheck();
	console.debug("[AppShell] Inited translationEngine (Cache Phase).");

	await initIdentityEngine();
	console.debug("[AppShell] Inited identityEngine.");

	// Monitoring
	if (window.__hydration_start) {
		const hydrationTime = hydrationEnd - window.__hydration_start;
		console.debug(`[AppShell] Hydration completed in ${hydrationTime.toFixed(2)} ms.`);
	} else {
		console.warn(
			"[AppShell] Hydration start time not defined. Cannot monitor hydration performance."
		);
	}

	//onCLS(console.log);
	//onINP(console.log);
	//onLCP(console.log);
	//console.debug("[AppShell] Telemetry observers attached.");
}

export async function afterIdentityInit() {
	setDateFormat(identityState!.preferences!.dateFormat);
	setFirstDayOfWeek(identityState!.preferences!.firstDayOfWeek);
	const LANGUAGE = getCookie(LANGUAGE_CACHE_KEY) || "en-us";
	if (LANGUAGE !== identityState!.preferences!.language) {
		setLanguage(identityState!.preferences!.language);
	}
	setTheme(identityState!.preferences!.theme);
	setTimezone(identityState!.preferences!.timezone);
}
