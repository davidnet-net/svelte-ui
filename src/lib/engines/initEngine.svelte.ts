import { getCookie, setCookie } from "../utils/cookies";
import { initAppState } from "./appStateEngine.svelte";
import { initIdentityEngine } from "./identityEngine.svelte";
import { isValidTheme, setTheme, type themeNames } from "./themeEngine.svelte";
import { createTranslationEngine, type ParaglideRuntimeType } from "./translationEngine.svelte";

export async function init<T extends string>(paraglideRuntime: ParaglideRuntimeType<T>) {
	console.groupCollapsed("Davidnet Design System - information");
	console.log("version: " + __DDS_INFO__.version);
	console.log("commitUrl: " + __DDS_INFO__.commitUrl);
	console.log("commitHash: " + __DDS_INFO__.commitHash);
	console.log("buildTime: " + __DDS_INFO__.buildTime);
	console.groupEnd();

	await initAppState();
	console.debug("[AppShell] Inited appStateEngine.");

	// Theme Cache
	let theme_cache = getCookie("theme_cache");
	if (!isValidTheme(theme_cache)) {
		console.debug("[AppShell] Created new theme_cache.");
		setCookie("theme_cache", "system");
		theme_cache = "system";
	}
	setTheme(theme_cache as themeNames);
	console.debug(`[AppShell] Set theme ${theme_cache} based on theme_cache`);

	await initIdentityEngine();

	try {
		console.debug("[AppShell] Inited translationEngine.");
		createTranslationEngine(paraglideRuntime);
		//! Change language with:
		//! language localstorage key
	} catch (err: unknown) {
		const error =
			err instanceof Error ? err : new Error("An unexpected error occurred", { cause: err });
		console.error("[AppShell] Could not configure translationEngine \n\n", error);
	}
}
