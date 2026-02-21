import { style, styleVariants } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens";

const baseTextField = style({
	borderRadius: token.global.radius.medium,
	backgroundColor: token.theme.color.surface.sunken.normal,
	color: token.theme.color.text.default,
	border: "none",
	outline: `${token.global.borderWidth.thick} solid ${token.theme.color.border.default}`,
	fontFamily: token.global.font.family.sans,
	fontSize: token.global.font.size.medium,
	padding: token.global.spacing.xsmall,
	lineHeight: token.global.font.lineHeight.normal,
	width: "100%",
	overflowX: "scroll",
	":disabled": {
		cursor: "not-allowed"
	}
});

const invalid = style({
	outline: `${token.global.borderWidth.thick} solid ${token.theme.color.text.danger}`
});

const counter = styleVariants({
	normal: {
		color: token.theme.color.text.tertiary
	},
	near: {
		color: token.theme.color.text.warning
	},
	max: {
		color: token.theme.color.text.danger
	}
});

export const styles = {
	baseTextField,
	invalid,
	counter
};
