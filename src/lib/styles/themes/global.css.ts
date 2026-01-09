import { createGlobalTheme } from "@vanilla-extract/css";
import { interFontName, momoTrustDisplayFontName } from "../fonts.css.ts";

export const global = createGlobalTheme(":root", {
	font: {
		family: {
			display: `"${momoTrustDisplayFontName}"`,
			sans: `"${interFontName}", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`,
			mono: "monospace"
		},
		weight: {
			regular: "400",
			bold: "700"
		},
		size: {
			xhuge: "3rem",
			huge: "2.5rem",
			xlarge: "2rem",
			large: "1.5rem",
			medium: "1rem",
			small: "0.75rem"
		}
	},

	spacing: {
		none: "0",
		xsmall: "0.25rem", // 4px
		small: "0.5rem", // 8px
		medium: "1rem", // 16px
		large: "1.5rem", // 24px
		xlarge: "2rem" // 32px
	},

	radius: {
		none: "0",
		small: "4px",
		medium: "8px",
		large: "16px",
		full: "9999px"
	},

	borderWidth: {
		standard: "1px",
		thick: "2px"
	}
});
