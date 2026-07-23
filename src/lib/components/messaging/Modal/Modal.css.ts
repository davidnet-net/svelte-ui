import { style } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens";

const baseModal = style({
	backgroundColor: token.theme.color.surface.overlay.normal,
	display: "flex",
	flexDirection: "column",
	gap: token.global.spacing.small,
	padding: token.global.spacing.medium,
	// Enables smooth container resizing when dynamic content height changes
	transition:
		"height 0.3s cubic-bezier(0.4, 0, 0.2, 1), min-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
});

const normalScreen = style({
	maxWidth: "700px",
	width: "60dvw",
	maxHeight: "80vh",
	minHeight: "12rem",
	borderRadius: token.global.radius.xlarge
});

const mobileScreen = style({
	maxWidth: "600px",
	width: "80dvw",
	maxHeight: "50vh",
	minHeight: "12rem",
	borderRadius: token.global.radius.xlarge
});

const tinyScreen = style({
	width: "100dvw",
	height: "100dvh",
	minHeight: "0px"
});

const header = style({
	borderBottomColor: token.theme.color.border.default,
	borderBottomWidth: token.global.borderWidth.thick,
	borderBottomStyle: "solid",
	display: "flex",
	justifyContent: "space-between",
	flex: "0 0 auto" // Fixed header height
});

const title = style({
	fontSize: token.global.font.size.large
});

const content = style({
	padding: token.global.spacing.xsmall,
	overflowY: "auto",
	flex: "1 1 auto", // Dynamic main content container
	lineHeight: token.global.font.lineHeight.normal,
	minHeight: "0" // Critical for dynamic flex scrolling
});

const actions = style({
	width: "100%",
	display: "flex",
	justifyContent: "end",
	alignItems: "center",
	gap: token.global.spacing.small,
	flex: "0 0 auto", // Prevents action buttons from expanding vertically
	height: "fit-content"
});

export const styles = {
	baseModal,
	normalScreen,
	mobileScreen,
	tinyScreen,
	header,
	title,
	content,
	actions
};
