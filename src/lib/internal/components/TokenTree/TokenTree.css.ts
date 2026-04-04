import { style } from "@vanilla-extract/css";

import { token } from "$lib//styles/designTokens.ts";

export const tokenLevel = style({
	paddingLeft: token.global.spacing.medium,
	borderLeft: `${token.global.borderWidth.standard} solid ${token.theme.color.border.default}`,
	margin: `${token.global.spacing.xsmall} 0`
});

export const tokenHeading = style({
	margin: `${token.global.spacing.large} 0 ${token.global.spacing.xsmall} 0`,
	fontFamily: token.global.font.family.brand,
	color: token.theme.color.text.default,
	textTransform: "capitalize"
});

export const tokenRow = style({
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	padding: token.global.spacing.small,
	background: token.theme.color.surface.sunken.normal,
	borderRadius: token.global.radius.medium,
	marginBottom: token.global.spacing.xsmall
});

export const tokenInfo = style({
	display: "flex",
	flexDirection: "column",
	gap: "4px"
});

export const valueContainer = style({
	display: "flex",
	alignItems: "center",
	gap: token.global.spacing.small
});

export const swatch = style({
	width: "16px",
	height: "16px",
	borderRadius: token.global.radius.full,
	border: `${token.global.borderWidth.standard} solid ${token.theme.color.border.default}`
});

export const tokenValue = style({
	fontFamily: token.global.font.family.mono,
	fontSize: token.global.font.size.small,
	fontWeight: token.global.font.weight.bold
});

export const rawVariable = style({
	fontSize: "10px",
	color: token.theme.color.text.tertiary,
	fontFamily: token.global.font.family.mono
});

export const copyButton = style({
	fontSize: token.global.font.size.small,
	padding: "6px 12px",
	cursor: "pointer",
	background: token.theme.color.background.subtle.normal,
	color: token.theme.color.text.default,
	border: `${token.global.borderWidth.standard} solid ${token.theme.color.border.default}`,
	borderRadius: token.global.radius.small,
	transition: `all ${token.global.transition.duration.fast} ${token.global.transition.timing.ease}`
});

export const key = style({
	fontWeight: token.global.font.weight.bold
});
