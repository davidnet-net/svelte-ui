import { style, styleVariants } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens";

const inputContainer = style({
	display: "flex",
	alignItems: "center",
	borderRadius: token.global.radius.medium,
	backgroundColor: token.theme.color.surface.sunken.normal,
	outline: `${token.global.borderWidth.thick} solid ${token.theme.color.border.default}`,
	width: "100%",
	overflow: "hidden"
});

const baseTextField = style({
	flex: 1,
	backgroundColor: "transparent",
	color: token.theme.color.text.default,
	border: "none",
	outline: "none",
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

const suffix = style({
	display: "flex",
	alignItems: "center",

	flexShrink: 0
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
	inputContainer,
	baseTextField,
	suffix,
	invalid,
	counter
};
