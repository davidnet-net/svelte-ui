import { createThemeContract } from "@vanilla-extract/css";

//? Contract - Schema
export const theme = createThemeContract({
	color: {
		text: {
			default: null,
			secondary: null,
			tertiary: null,
			inverse: null,
			disabled: null,
			selected: null,
			danger: null,
			warning: null,
			success: null,
			discover: null,
			information: null,
			UNSAFE: {
				white_default: null,
				dark_default: null
			}
		},
		link: {
			default: null,
			pressed: null,
			visited: {
				default: null,
				pressed: null
			}
		},
		background: {
			danger: {
				normal: null,
				hover: null,
				pressed: null
			},
			warning: {
				normal: null,
				hover: null,
				pressed: null
			},
			primary: {
				normal: null,
				hover: null,
				pressed: null
			},
			success: {
				normal: null,
				hover: null,
				pressed: null
			},
			discover: {
				normal: null,
				hover: null,
				pressed: null
			},
			information: {
				normal: null,
				hover: null,
				pressed: null
			},
			disabled: {
				normal: null
			},
			subtle: {
				normal: null,
				hover: null,
				pressed: null
			}
		},

		surface: {
			sunken: {
				normal: null
			},
			default: {
				normal: null,
				hover: null,
				pressed: null
			},
			raised: {
				normal: null,
				hover: null,
				pressed: null
			},
			overlay: {
				normal: null,
				hover: null,
				pressed: null
			}
		},
		border: {
			focus: null,
			default: null
		},
		blanket: null
	}
});
