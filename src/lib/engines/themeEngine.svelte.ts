/**
 * @file themeEngine.svelte.ts
 */
import {
	iconFontName,
	iconFontRoundedName,
	interFontName,
	momoTrustDisplayFontName
} from "../styles/fonts.css.ts";
import { darkTheme } from "../styles/themes/dark.css.ts";
import { lightTheme } from "../styles/themes/light.css.ts";
import { appState } from "./appStateEngine.svelte.ts";

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

if (typeof document !== "undefined") {
	Promise.all([
		document.fonts.load(`1em "${iconFontName}"`),
		document.fonts.load(`1em "${iconFontRoundedName}"`)
	]).then(() => {
		fontState.iconFontsLoaded = true;
	});

	Promise.all([document.fonts.load(`1em "${interFontName}"`)]).then(() => {
		fontState.interFontLoaded = true;
	});

	Promise.all([document.fonts.load(`1em "${momoTrustDisplayFontName}"`)]).then(() => {
		fontState.momoTrustDisplayFontLoaded = true;
	});
}
