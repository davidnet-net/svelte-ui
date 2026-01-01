import { createTheme } from "@vanilla-extract/css";
import { token } from "../schema.css.ts";
import { palette } from "../pallete.ts";

export const darkTheme = createTheme(token, {
	color: {
		text: {
			neutral: palette.DarkNeutral1000
		}
	},

	colors: {
		bg: {
			primary: "#0f172a",
			secondary: "#1e293b",
			surface: "#1e293b"
		},
		text: {
			primary: "#f8fafc",
			secondary: "#94a3b8"
		},
		brand: "#60a5fa"
	},
	space: {
		sm: "0.5rem",
		md: "1rem",
		lg: "1.5rem"
	},
	fonts: {
		test: "sans-serif"
	}
});
