import manifest from "$lib/internal/manifests/version-manifest.json";

import { getCookie, setCookie } from "../utils/cookies";
import { initAppState } from "./appStateEngine.svelte";
import { initIdentityEngine } from "./identityEngine.svelte";
import { isValidTheme, setTheme, type themeNames } from "./themeEngine.svelte";
import { createTranslationEngine, type ParaglideRuntimeType } from "./translationEngine.svelte";

export async function init<T extends string>(paraglideRuntime: ParaglideRuntimeType<T>) {
	console.groupCollapsed("Davidnet Design System - information");
	console.log("version: " + manifest.version);
	console.log("commitUrl: " + manifest.commitUrl);
	console.log("commitHash: " + manifest.commitHash);
	console.log("buildTime: " + manifest.buildTime);
	console.groupEnd();

	await initAppState();
	console.debug("[AppShell] Inited appStateEngine.");

	// --- Theme Setup (Cache Phase) ---
	let theme_cache = getCookie("theme_cache");
	if (!isValidTheme(theme_cache)) {
		console.debug("[AppShell] Created new theme_cache.");
		setCookie("theme_cache", "system");
		theme_cache = "system";
	}
	setTheme(theme_cache as themeNames);
	console.debug(`[AppShell] Set theme ${theme_cache} based on theme_cache`);

	// --- Translation Engine Setup (Cache Phase) ---
	const runTranslationCheck = createTranslationEngine(paraglideRuntime);
	await runTranslationCheck();
	console.debug("[AppShell] Inited translationEngine (Cache Phase).");

	await initIdentityEngine();
	console.debug("[AppShell] Inited identityEngine.");

	// We give preference of database language with:
	//await runTranslationCheck("nl");
}
