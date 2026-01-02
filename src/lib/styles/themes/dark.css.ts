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
			danger: "#ae2e24",
			warning: "#f5cd47",
			success: "#7ee2b8",
			discover: "#b8acf6",
			information: "#85b8ff"
		},

		link: {
			default: "#4794ff",
			pressed: "#85b8ff",
			visited: {
				default: "#b8acf6",
				pressed: "#a292f3"
			}
		},

		background: {
			danger: {
				normal: "#8b0f06",
				hover: "#b4241a",
				pressed: "#2c2c2c"
			},
			warning: {
				normal: "#866602",
				hover: "#c48b1c",
				pressed: "#2c2c2c"
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
			information: {
				normal: "#4098ff",
				hover: "#327ad1",
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
			}
		},

		border: {
			focus: "rgba(255, 0, 0, 0.5)",
			default: "#2f353a"
		},

		blanket: "rgba(0, 0, 0, 0.5);"
	}
});
