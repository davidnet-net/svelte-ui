import { style } from "@vanilla-extract/css";

import { token } from "../../../styles/designTokens.ts";

const baseHeader = style({
	backgroundColor: token.theme.color.surface.sunken.normal,
	height: "20rem",
	width: "100%",
	padding: token.global.spacing.xlarge,
	display: "flex",
	alignContent: "center",
	flexDirection: "row",
	lineHeight: token.global.font.lineHeight.normal
});

const header = style({
	fontFamily: token.global.font.family.brand,
	fontSize: token.global.font.size.xhuge
});

export const styles = {
	baseHeader,
	header
};
