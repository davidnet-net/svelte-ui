import { createGlobalTheme } from "@vanilla-extract/css";

import { interFallbackName, interFontName, momoTrustDisplayFontName } from "../fonts.css.ts";

export const global = createGlobalTheme(":root", {
	font: {
		family: {
			brand: `"${momoTrustDisplayFontName}"`,
			sans: `"${interFontName}", "${interFallbackName}", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`,
			mono: "monospace"
		},
		weight: {
			regular: "400",
			medium: "500",
			bold: "700",
			heavy: "900"
		},
		size: {
			xhuge: "3rem",
			huge: "2.5rem",
			xlarge: "2rem",
			large: "1.5rem",
			xmedium: "1.25rem",
			medium: "1rem",
			small: "0.75rem"
		},
		lineHeight: {
			none: "1",
			tight: "1.25",
			normal: "1.5"
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
		medium: "6px",
		large: "8px",
		xlarge: "12px",
		huge: "16px",
		full: "9999px"
	},

	borderWidth: {
		standard: "1px",
		thick: "2px"
	},

	transition: {
		duration: {
			fast: "100ms", // Micro
			standard: "200ms", // Hover & Fade in
			slow: "400ms", // Modal
			xslow: "2s" // Shimmer
		},
		timing: {
			linear: "linear",
			ease: "ease",
			easeIn: "ease-in",
			easeOut: "ease-out",
			easeInOut: "ease-in-out"
		}
	},

	zIndex: {
		noscript: "30",
		blanket: "20",
		toolTip: "10"
	}
});
