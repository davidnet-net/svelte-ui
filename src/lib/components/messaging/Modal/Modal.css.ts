import { style } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens.ts";

const baseModal = style({
	backgroundColor: token.theme.color.surface.overlay.normal,
	display: "flex",
	flexDirection: "column",
	gap: token.global.spacing.small,
	padding: token.global.spacing.medium
});

const normalScreen = style({
	maxWidth: "600px",
	width: "60dvw",
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
	justifyContent: "space-between"
});

const title = style({
	fontSize: token.global.font.size.large
});

const content = style({
	padding: token.global.spacing.xsmall,
	overflowY: "auto",
	flex: 1,
	flexBasis: "auto",
	lineHeight: token.global.font.lineHeight.normal,
	minHeight: "fit-content"
});

const actions = style({
	width: "100%",
	display: "flex",
	justifyContent: "end",
	alignItems: "center",
	gap: token.global.spacing.small,
	flex: 1,
	height: "fit-content"
});

export const styles = {
	baseModal,
	normalScreen,
	tinyScreen,
	header,
	title,
	content,
	actions
};
