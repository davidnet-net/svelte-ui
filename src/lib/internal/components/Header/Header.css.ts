import { style } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens.ts";

const baseHeader = style({
	backgroundColor: token.theme.color.surface.sunken.normal,
	height: "20rem",
	maxHeight: "fit-content",
	width: "100%",
	padding: token.global.spacing.xlarge,
	display: "flex",
	alignContent: "center",
	flexDirection: "row",
	lineHeight: token.global.font.lineHeight.normal,
	fontSize: token.global.font.size.xmedium
});

const header = style({
	fontFamily: token.global.font.family.brand,
	fontSize: token.global.font.size.xhuge
});

export const styles = {
	baseHeader,
	header
};
