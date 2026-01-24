import { style } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens.ts";

const base = style({
	display: "flex",
	flexDirection: "column",
	height: "100vh",
	width: "100vw",
	overflow: "hidden",

	// Firefox & Zen Browser support
	scrollbarWidth: "thin",
	scrollbarColor: "#4a4a4a transparent",

	selectors: {
		// Webkit browsers (Chrome, Safari, Edge)
		"&::-webkit-scrollbar": {
			width: "8px",
			height: "8px"
		},
		"&::-webkit-scrollbar-track": {
			background: "transparent"
		},
		"&::-webkit-scrollbar-thumb": {
			backgroundColor: "#4a4a4a",
			borderRadius: "20px",
			border: "2px solid transparent",
			backgroundClip: "content-box"
		},
		"&::-webkit-scrollbar-thumb:hover": {
			backgroundColor: "#666666"
		}
	}
});

const container = style({
	display: "flex",
	flexDirection: "column",
	height: "100%",
	width: "100%"
});

const maincontainer = style({
	display: "flex",
	flexDirection: "column",
	height: "100%",
	width: "100%"
});

const contentRow = style({
	display: "flex",
	flex: 1,
	overflow: "hidden",
	width: "100%"
});

const mainScrollArea = style({
	flex: 1,
	height: "100%",
	overflowY: "auto",
	display: "flex",
	flexDirection: "column"
});

const childrenWrapper = style({
	minHeight: "100%",
	width: "100%",
	flex: "1 0 auto",
	flexDirection: "column"
});

const noscriptoverlay = style({
	position: "fixed",
	top: "0",
	left: "0",
	width: "100vw",
	height: "100vh",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: token.theme.color.surface.overlay.normal,
	zIndex: token.global.zIndex.noscript
});

export const styles = {
	base,
	container,
	maincontainer,
	contentRow,
	mainScrollArea,
	childrenWrapper,
	noscriptoverlay
};
