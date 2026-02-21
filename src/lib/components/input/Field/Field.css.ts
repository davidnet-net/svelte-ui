import { style } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens";

const baseField = style({
	display: "flex",
	flexDirection: "column",
	gap: token.global.spacing.small
});

const label = style({
	fontWeight: token.global.font.weight.medium
});

const requiredMark = style({
	fontWeight: token.global.font.weight.medium,
	color: token.theme.color.text.danger,
	fontSize: token.global.font.size.medium,
	lineHeight: token.global.font.lineHeight.none
});

const invalidMessage = style({
	verticalAlign: "middle",
	display: "flex",
	alignContent: "center",
	color: token.theme.color.text.danger,
	gap: token.global.spacing.xsmall
});

const statusbar = style({
	fontSize: token.global.font.size.small,
	lineHeight: token.global.font.lineHeight.none,
	display: "flex",
	gap: token.global.spacing.xsmall,
	fontWeight: token.global.font.weight.medium
});

const statusRight = style({
	marginLeft: "auto",
	display: "flex",
	flexShrink: 0
});

export const styles = {
	baseField,
	label,
	requiredMark,
	invalidMessage,
	statusbar,
	statusRight
};
