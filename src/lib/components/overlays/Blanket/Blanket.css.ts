import { style } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens.ts";

const baseBlanket = style({
	position: "fixed",
	top: "0",
	left: "0",
	width: "100vw",
	height: "100vh",
	backgroundColor: token.theme.color.blanket,
	zIndex: token.global.zIndex.blanket,
	display: "flex"
});

const centered = style({
	alignItems: "center",
	justifyContent: "center",
	flexDirection: "column"
});

const notCentered = style({
	alignItems: "flex-start",
	justifyContent: "flex-start"
});

export const styles = {
	baseBlanket,
	centered,
	notCentered
};
