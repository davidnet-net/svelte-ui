import { style } from "@vanilla-extract/css";

import { token } from "../../../styles/designTokens.ts";

const base = style({
	display: "flex",
	flexDirection: "column",
	height: "100vh",
	width: "100vw"
});

const nav = style({
	backgroundColor: token.theme.color.surface.raised.normal,
	height: "48px",
	width: "100%",
	boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
	padding: "0 1.5rem"
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
	backgroundColor: token.theme.color.surface.overlay.normal
});

export const styles = {
	base,
	nav,
	noscriptoverlay
};
