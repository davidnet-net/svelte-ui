import { lightTheme } from "./themes/light.css.ts";
import { darkTheme } from "./themes/dark.css.ts";

export const currentTheme = $state({
	themeObject: lightTheme,
	themeName: "light"
});

export function setTheme(themeName: "light" | "dark") {
	if (themeName === "light") {
		currentTheme.themeObject = lightTheme;
		currentTheme.themeName = "light";
	} else if (themeName === "dark") {
		currentTheme.themeObject = darkTheme;
		currentTheme.themeName = "dark";
	}
}
