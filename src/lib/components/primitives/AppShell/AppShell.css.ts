import { style } from "@vanilla-extract/css";

import { token } from "../../../styles/designTokens.ts";

const base = style({
	display: "flex",
	flexDirection: "column",
	height: "100vh",
	width: "100vw",
	overflow: "auto"
});

const container = style({
	display: "flex",
	flexDirection: "column",
	height: "100vh",
	width: "100vw"
});

const maincontainer = style({
	display: "flex",
	flexDirection: "column",
	minHeight: "100vh",
	width: "100vw"
});

const nav = style({
	backgroundColor: token.theme.color.surface.raised.normal,
	height: "48px",
	width: "100%",
	padding: "1rem 1.5rem",
	display: "flex",
	verticalAlign: "middle",
	flexDirection: "row",
	alignItems: "center",
	position: "relative",
	flexShrink: 0,
	boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)"
});

const navLeft = style({
	justifyContent: "flex-start",
	flex: 1,
	display: "flex",
	alignItems: "center"
});

const navCenter = style({
	justifyContent: "center",
	flex: 1,
	display: "flex",
	alignItems: "center"
});

const navRight = style({
	justifyContent: "flex-end",
	flex: 1,
	display: "flex",
	alignItems: "center"
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
	container,
	maincontainer,
	nav,
	navLeft,
	navRight,
	navCenter,
	noscriptoverlay
};
