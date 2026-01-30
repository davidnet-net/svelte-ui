import { createTheme } from "@vanilla-extract/css";

import { token } from "../designTokens.ts";

export const lightTheme = createTheme(token.theme, {
	color: {
		text: {
			default: "#292a2e",
			secondary: "#444444",
			tertiary: "#666666",
			inverse: "#ffffff",
			disabled: "#999999",
			selected: "#1868DB",
			danger: "#ae2e24",
			warning: "#a54800",
			success: "#216e4e",
			discover: "#5e4db2",
			primary: "#0055cc",
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
		skeleton: {
			from: "#dfe1e6",
			to: "#ebecf0"
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
				normal: "#0C66E4",
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

			disabled: {
				normal: "#cccccc"
			},

			subtle: {
				normal: "transparent",
				hover: "rgba(0, 0, 0, 0.04)",
				pressed: "rgba(0, 0, 0, 0.08)"
			},
			selected: {
				normal: "#0c66e486",
				hover: "#1669c184",
				pressed: "#2c2c2c"
			}
		},

		surface: {
			sunken: {
				normal: "#f8f8f8"
			},
			default: {
				normal: "##ffffff",
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
			},
			inversed: {
				sunken: {
					normal: "#161a1d"
				},
				default: {
					normal: "#1d2125",
					hover: "#2a2f35",
					pressed: "#32383f"
				},
				raised: {
					normal: "#22272b",
					hover: "#2f353a",
					pressed: "#3a4249"
				},
				overlay: {
					normal: "#282e33",
					hover: "#353c44",
					pressed: "#404952"
				}
			}
		},

		border: {
			focus: "rgba(255, 0, 0, 0.5)",
			default: "#dfe1e6",
			selected: "#145fcc",
			highlighted: "#1d212583"
		},

		blanket: "rgba(0, 0, 0, 0.6);"
	}
});
