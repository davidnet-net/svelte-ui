import { style } from "@vanilla-extract/css";
import { token } from "$lib/styles/designTokens";

export const inputContainer = style({
	display: "flex",
	alignItems: "center",
	borderRadius: token.global.radius.medium,
	backgroundColor: token.theme.color.surface.sunken.normal,
	outline: `${token.global.borderWidth.thick} solid ${token.theme.color.border.default}`,
	paddingLeft: token.global.spacing.medium,
	paddingRight: token.global.spacing.medium,
	width: "100%",
	overflow: "hidden"
});

export const baseCommandPallete = style({
	flex: 1,
	backgroundColor: "transparent",
	color: token.theme.color.text.default,
	border: "none",
	outline: "none",
	height: "3rem",
	fontFamily: token.global.font.family.sans,
	fontSize: token.global.font.size.medium,
	padding: token.global.spacing.xsmall,
	lineHeight: token.global.font.lineHeight.normal,
	width: "40rem",
	maxWidth: "90dvw",
	overflowX: "scroll",
	":disabled": {
		cursor: "not-allowed"
	}
});

export const wrapper = style({
	position: "relative",
	width: "100%",
	maxWidth: "600px"
});

export const dropdownContainer = style({
	position: "absolute",
	top: "100%",
	left: 0,
	width: "100%",
	backgroundColor: token.theme.color.surface.default.normal,
	border: `${token.global.borderWidth.standard} solid ${token.theme.color.border.default}`,
	marginTop: token.global.spacing.medium,
	borderRadius: token.global.radius.medium,
	zIndex: token.global.zIndex.dropdown,
	boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
	overflow: "hidden"
});

export const dropdownItem = style({
	display: "flex",
	alignItems: "center",
	width: "100%",
	textAlign: "left",
	border: "none",
	padding: `${token.global.spacing.small} ${token.global.spacing.medium}`,
	cursor: "pointer",
	backgroundColor: "transparent",
	fontFamily: token.global.font.family.sans,
	color: token.theme.color.text.default,
	selectors: {
		"&[data-selected='true']": {
			backgroundColor: token.theme.color.background.selected.normal
		}
	}
});

export const dropdownLabel = style({
	fontWeight: token.global.font.weight.bold,
	color: token.theme.color.text.primary
});

export const dropdownDescription = style({
	fontSize: token.global.font.size.small,
	color: token.theme.color.text.secondary,
	marginLeft: token.global.spacing.small
});
