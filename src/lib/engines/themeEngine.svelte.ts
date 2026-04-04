/**
 * @file themeEngine.svelte
 */
import {
	iconFontName,
	iconFontRoundedName,
	interFontName,
	momoTrustDisplayFontName
} from "../styles/fonts.css";
import { darkTheme } from "../styles/themes/dark.css";
import { lightTheme } from "../styles/themes/light.css";
import { appState } from "./appStateEngine.svelte";

export type themeNames = "light" | "dark" | "system" | "contrast";

let selectedTheme = $state<themeNames>("light");

// Create the derived signal outside the object
const activeThemeObject = $derived.by(() => {
	if (selectedTheme === "system") {
		return appState.systemPreference.darkMode ? darkTheme : lightTheme;
	}
	if (selectedTheme === "contrast") {
		// High Contrast logic can be expanded here
		return darkTheme;
	}
	return selectedTheme === "dark" ? darkTheme : lightTheme;
});

export const currentTheme = {
	get themeName() {
		return selectedTheme;
	},
	// Use a getter to read the current value of the derived signal
	get themeObject() {
		return activeThemeObject;
	}
};

export function setTheme(themeName: themeNames) {
	if (themeName === "contrast") {
		console.warn("[themeEngine]: High Contrast not yet supported!");
	}
	selectedTheme = themeName;
}

// Reason could be any input:
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isValidTheme(themeName: any): themeName is themeNames {
	const validThemes: themeNames[] = ["light", "dark", "system", "contrast"];
	return validThemes.includes(themeName);
}

export const fontState = $state({
	iconFontsLoaded: false,
	interFontLoaded: false,
	momoTrustDisplayFontLoaded: false
});

/**
 * Executes an asynchronous function with exponential backoff retries.
 * Useful for transient network errors during asset loading.
 *
 * @param fn - The async function to execute.
 * @param retries - Number of remaining retry attempts.
 * @param delay - Delay before the next retry in milliseconds.
 * @returns A promise resolving to the function's result.
 */
const withRetry = async <T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> => {
	try {
		return await fn();
	} catch (error) {
		if (retries <= 0) throw error;
		await new Promise((resolve) => setTimeout(resolve, delay));
		return withRetry(fn, retries - 1, delay * 2);
	}
};

/**
 * Loads a single font family with a retry mechanism and updates the associated state key.
 *
 * @param fontName - The name of the font family to load.
 * @param stateKey - The key within `fontState` to update upon success.
 */
const loadFontWithRetry = async (
	fontName: string,
	stateKey: keyof typeof fontState
): Promise<void> => {
	try {
		await withRetry(() => document.fonts.load(`1em "${fontName}"`));
		fontState[stateKey] = true;
	} catch (error) {
		console.error(`[themeEngine]: Failed to load font "${fontName}" after retries.`, error);
	}
};

// Ensure font loading only executes on the client to prevent SSR reference errors
if (typeof document !== "undefined") {
	// Group icon fonts together to maintain the original Promise.all behavior,
	// but wrap individual calls in the retry logic.
	const loadIconFonts = async () => {
		try {
			await Promise.all([
				withRetry(() => document.fonts.load(`1em "${iconFontName}"`)),
				withRetry(() => document.fonts.load(`1em "${iconFontRoundedName}"`))
			]);
			fontState.iconFontsLoaded = true;
		} catch (error) {
			console.error(`[themeEngine]: Failed to load icon fonts after retries.`, error);
		}
	};

	loadIconFonts();
	loadFontWithRetry(interFontName, "interFontLoaded");
	loadFontWithRetry(momoTrustDisplayFontName, "momoTrustDisplayFontLoaded");
}
