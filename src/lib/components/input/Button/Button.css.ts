import { style, styleVariants } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens.ts";

const baseButton = style({
	display: "inline-flex",
	alignItems: "center",
	gap: token.global.spacing.xsmall,
	verticalAlign: "middle",
	position: "relative",
	flexShrink: "0",

	minWidth: "120px",
	width: "auto",
	height: "2rem",

	paddingLeft: token.global.spacing.small,
	paddingRight: token.global.spacing.small,

	lineHeight: token.global.font.lineHeight.none,
	fontSize: token.global.font.size.medium,

	textDecoration: "none",
	fontWeight: token.global.font.weight.medium,
	textWrap: "nowrap",

	border: "none",
	borderRadius: token.global.radius.medium,

	transitionProperty: "background-color, color",
	transitionDuration: token.global.transition.duration.standard,
	transitionTimingFunction: token.global.transition.timing.ease
});

const alignContent = styleVariants({
	left: {
		justifyContent: "flex-start",
		textAlign: "left"
	},
	center: {
		justifyContent: "center",
		textAlign: "center"
	},
	right: {
		justifyContent: "flex-end",
		textAlign: "right"
	}
});

const appearance = styleVariants({
	danger: {
		backgroundColor: token.theme.color.background.danger.normal,
		color: token.theme.color.text.UNSAFE.dark_default,
		cursor: "pointer",
		":hover": {
			backgroundColor: token.theme.color.background.danger.hover
		},
		":active": {
			backgroundColor: token.theme.color.background.danger.pressed,
			color: token.theme.color.text.default
		}
	},
	warning: {
		backgroundColor: token.theme.color.background.warning.normal,
		color: token.theme.color.text.UNSAFE.white_default,
		cursor: "pointer",
		":hover": {
			backgroundColor: token.theme.color.background.warning.hover
		},
		":active": {
			backgroundColor: token.theme.color.background.warning.pressed,
			color: token.theme.color.text.default
		}
	},
	primary: {
		backgroundColor: token.theme.color.background.primary.normal,
		color: token.theme.color.text.UNSAFE.dark_default,
		cursor: "pointer",
		":hover": {
			backgroundColor: token.theme.color.background.primary.hover
		},
		":active": {
			backgroundColor: token.theme.color.background.primary.pressed,
			color: token.theme.color.text.default
		}
	},
	discover: {
		backgroundColor: token.theme.color.background.discover.normal,
		color: token.theme.color.text.default,
		cursor: "pointer",
		":hover": {
			backgroundColor: token.theme.color.background.discover.hover
		},
		":active": {
			backgroundColor: token.theme.color.background.discover.pressed,
			color: token.theme.color.text.default
		}
	},
	success: {
		backgroundColor: token.theme.color.background.success.normal,
		color: token.theme.color.text.UNSAFE.white_default,
		cursor: "pointer",
		":hover": {
			backgroundColor: token.theme.color.background.success.hover
		},
		":active": {
			backgroundColor: token.theme.color.background.success.pressed,
			color: token.theme.color.text.default
		}
	},
	subtle: {
		backgroundColor: token.theme.color.background.subtle.normal,
		color: token.theme.color.text.default,
		cursor: "pointer",
		":hover": {
			backgroundColor: token.theme.color.background.subtle.hover
		},
		":active": {
			backgroundColor: token.theme.color.background.subtle.pressed,
			color: token.theme.color.text.default
		}
	}
});

const disabledappearance = style({
	backgroundColor: token.theme.color.background.disabled.normal,
	color: token.theme.color.text.default,
	cursor: "not-allowed"
});

const stretchwidth = style({
	width: "100%"
});

export const styles = {
	baseButton,
	alignContent,
	appearance,
	disabledappearance,
	stretchwidth
};
