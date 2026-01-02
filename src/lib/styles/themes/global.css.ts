import { createGlobalTheme, createThemeContract } from "@vanilla-extract/css";
import { interFontName } from "../fonts.css.ts";

export const global = createGlobalTheme(":root", {
	font: {
		family: {
			sans: `"${interFontName}", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`,
			mono: "monospace"
		},
		weight: {
			regular: "400",
			bold: "700"
		}
	},

	spacing: {
		"0": "0",
		"1": "0.25rem", // 4px
		"1.5": "0.375rem", // 6px
		"2": "0.5rem", // 8px
		"2.5": "0.625rem", // 10px
		"3": "0.75rem", // 12px
		"4": "1rem", // 16px
		"5": "1.25rem", // 20px
		"6": "1.5rem" // 24px
	},

	radius: {
		"0": "0",
		"1": "2px",
		"2": "4px",
		"3": "8px",
		"4": "12px",
		"5": "16px",
		full: "9999px"
	},

	borderWidth: {
		standard: "1px",
		thick: "2px"
	}
});
