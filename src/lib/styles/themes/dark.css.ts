import { createTheme } from "@vanilla-extract/css";

import { token } from "../designTokens.ts";

export const darkTheme = createTheme(token.theme, {
	color: {
		text: {
			default: "#f1f1f1",
			secondary: "#cccccc",
			tertiary: "#999999",
			inverse: "#111111",
			disabled: "#666666",
			selected: "#4C9AFF",
			danger: "#e53935",
			warning: "#f5cd47",
			success: "#7ee2b8",
			discover: "#b8acf6",
			primary: "#85b8ff",
			UNSAFE: {
				white_default: "#111111",
				dark_default: "#f1f1f1"
			}
		},

		link: {
			default: "#4794ff",
			pressed: "#85b8ff",
			visited: {
				default: "#b8acf6",
				pressed: "#a292f3"
			}
		},
		skeleton: {
			from: "#22272b",
			to: "#353c44"
		},
		background: {
			danger: {
				normal: "#ae2e24",
				hover: "#b4241a",
				pressed: "#2c2c2c"
			},
			warning: {
				normal: "#cb8616ff",
				hover: "#cf8714ff",
				pressed: "#d0d0d0"
			},
			primary: {
				normal: "#0d3e8b",
				hover: "#145fcc",
				pressed: "#2c2c2c"
			},
			success: {
				normal: "#00c48c",
				hover: "#009f72",
				pressed: "#2c2c2c"
			},
			discover: {
				normal: "#540b7e",
				hover: "#7159c4",
				pressed: "#2c2c2c"
			},

			disabled: {
				normal: "#444444"
			},

			subtle: {
				normal: "transparent",
				hover: "rgba(255, 255, 255, 0.08)",
				pressed: "rgba(255, 255, 255, 0.16)"
			}
		},

		surface: {
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
			},
			inversed: {
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
			}
		},

		border: {
			focus: "rgba(255, 0, 0, 0.5)",
			default: "#2f353a"
		},

		blanket: "rgba(0, 0, 0, 0.6);"
	}
});
