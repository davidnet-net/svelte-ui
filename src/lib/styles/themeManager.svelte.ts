import {
	iconFontName,
	iconFontRoundedName,
	interFontName,
	momoTrustDisplayFontName
} from "./fonts.css.ts";
import { darkTheme } from "./themes/dark.css.ts";
import { lightTheme } from "./themes/light.css.ts";

export const currentTheme = $state({
	themeObject: lightTheme,
	themeName: "light"
});

export function setTheme(themeName: "light" | "dark") {
	switch (themeName) {
		case "light":
			currentTheme.themeObject = lightTheme;
			currentTheme.themeName = "light";
			break;
		case "dark":
			currentTheme.themeObject = darkTheme;
			currentTheme.themeName = "dark";
			break;
	}
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
}
if (typeof document !== "undefined") {
	Promise.all([document.fonts.load(`1em "${interFontName}"`)]).then(() => {
		fontState.iconFontsLoaded = true;
	});
}
if (typeof document !== "undefined") {
	Promise.all([document.fonts.load(`1em "${momoTrustDisplayFontName}"`)]).then(() => {
		fontState.momoTrustDisplayFontLoaded = true;
	});
}
