import { createThemeContract } from "@vanilla-extract/css";

//? Contract - Schema
export const token = createThemeContract({
	color: {
		text: {
			neutral: null
		}
	},

	colors: {
		bg: {
			primary: null,
			secondary: null,
			surface: null
		},
		text: {
			primary: null,
			secondary: null
		},
		brand: null
	},
	space: {
		sm: null,
		md: null,
		lg: null
	},
	fonts: {
		test: null
	}
});
