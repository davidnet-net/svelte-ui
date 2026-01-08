import { createTheme } from "@vanilla-extract/css";
import { token } from "../designTokens.ts";

export const lightTheme = createTheme(token.theme, {
	color: {
		text: {
			default: "#111111",
			secondary: "#444444",
			tertiary: "#666666",
			inverse: "#ffffff",
			disabled: "#999999",
			selected: "#1868DB",
			danger: "#ae2e24",
			warning: "#a54800",
			success: "#216e4e",
			discover: "#5e4db2",
			information: "#0055cc",
			UNSAFE: {
				white_default: "#111111",
				dark_default: "#f1f1f1"
			}
		},

		link: {
			default: "#0052CC",
			pressed: "#0047B3",
			visited: {
				default: "#6554C0",
				pressed: "#5243AA"
			}
		},

		background: {
			danger: {
				normal: "#e53935",
				hover: "#cc2e2b",
				pressed: "#d0d0d0"
			},
			warning: {
				normal: "#f5a623",
				hover: "#e0971f",
				pressed: "#d0d0d0"
			},
			primary: {
				normal: "#1a73e8",
				hover: "#1669c1",
				pressed: "#d0d0d0"
			},
			success: {
				normal: "#00c48c",
				hover: "#00a97a",
				pressed: "#d0d0d0"
			},
			discover: {
				normal: "#8c70f0",
				hover: "#7159c4",
				pressed: "#d0d0d0"
			},
			information: {
				normal: "#4098ff",
				hover: "#327ad1",
				pressed: "#d0d0d0"
			},

			disabled: {
				normal: "#cccccc"
			},

			subtle: {
				normal: "transparent",
				hover: "rgba(0, 0, 0, 0.04)",
				pressed: "rgba(0, 0, 0, 0.08)"
			}
		},

		surface: {
			sunken: {
				normal: "#f4f5f7"
			},
			default: {
				normal: "#F8F9FB",
				hover: "#f0f0f0",
				pressed: "#e6e6e6"
			},
			raised: {
				normal: "#ffffffff",
				hover: "#f9f9f9",
				pressed: "#f0f0f0"
			},
			overlay: {
				normal: "#ffffffff",
				hover: "#e6e6e6",
				pressed: "#d9d9d9"
			}
		},

		border: {
			focus: "rgba(255, 0, 0, 0.5)",
			default: "#dfe1e6"
		},

		blanket: "rgba(0, 0, 0, 0.5);"
	}
});
