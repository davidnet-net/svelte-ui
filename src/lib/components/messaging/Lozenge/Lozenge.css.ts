import { style, styleVariants } from "@vanilla-extract/css";

import { token } from "../../../styles/designTokens";

export const baseStyle = style({
	fontSize: token.global.font.size.small,
	height: token.global.font.size.small,
	padding: token.global.spacing.xsmall,
	borderRadius: token.global.radius.small,
	width: "fit-content",
	lineHeight: token.global.font.lineHeight.none
});

export const appearance = styleVariants({
	danger: {
		backgroundColor: `color-mix(in srgb, ${token.theme.color.background.danger.normal} 80%, transparent)`,
		color: token.theme.color.text.default,
		fontWeight: token.global.font.weight.medium,
		borderColor: token.theme.color.background.danger.normal,
		borderStyle: "solid",
		borderWidth: token.global.borderWidth.standard
	},
	warning: {
		backgroundColor: `color-mix(in srgb, ${token.theme.color.background.warning.normal} 80%, transparent)`,
		color: token.theme.color.text.default,
		fontWeight: token.global.font.weight.medium,
		borderColor: token.theme.color.background.warning.normal,
		borderStyle: "solid",
		borderWidth: token.global.borderWidth.standard
	},
	primary: {
		backgroundColor: `color-mix(in srgb, ${token.theme.color.background.primary.normal} 80%, transparent)`,
		color: token.theme.color.text.default,
		fontWeight: token.global.font.weight.medium,
		borderColor: token.theme.color.background.primary.normal,
		borderStyle: "solid",
		borderWidth: token.global.borderWidth.standard
	},
	discover: {
		backgroundColor: `color-mix(in srgb, ${token.theme.color.background.discover.normal} 80%, transparent)`,
		color: token.theme.color.text.default,
		fontWeight: token.global.font.weight.medium,
		borderColor: token.theme.color.background.discover.normal,
		borderStyle: "solid",
		borderWidth: token.global.borderWidth.standard
	},
	success: {
		backgroundColor: `color-mix(in srgb, ${token.theme.color.background.success.normal} 50%, transparent)`,
		color: token.theme.color.text.default,
		fontWeight: token.global.font.weight.medium,
		borderColor: token.theme.color.background.success.normal,
		borderStyle: "solid",
		borderWidth: token.global.borderWidth.standard
	},
	default: {
		backgroundColor: `color-mix(in srgb, ${token.theme.color.background.subtle.normal} 80%, transparent)`,
		color: token.theme.color.text.default,
		fontWeight: token.global.font.weight.medium,
		borderColor: token.theme.color.background.subtle.normal,
		borderStyle: "solid",
		borderWidth: token.global.borderWidth.standard
	}
});
