import { style } from "@vanilla-extract/css";

import { token } from "../../../styles/designTokens.ts";

const base = style({
	display: "flex",
	flexDirection: "column",
	height: "100vh",
	width: "100vw",
	overflow: "hidden" // Prevents window scrolling
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

const contentRow = style({
	display: "flex",
	flex: 1,
	overflow: "hidden",
	width: "100%"
});

const sidebarWrapper = style({
	height: "100%",
	overflowY: "auto",
	flexShrink: 0
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

const footerWrapper = style({
	flexShrink: 0
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
	nav,
	navLeft,
	navRight,
	navCenter,
	contentRow,
	sidebarWrapper,
	mainScrollArea,
	childrenWrapper,
	footerWrapper,
	noscriptoverlay
};
