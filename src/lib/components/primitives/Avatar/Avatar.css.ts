import { style, styleVariants } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens";

const avatarContainer = style({
	display: "inline-flex",
	justifyContent: "center",
	alignItems: "center",
	boxSizing: "border-box",
	padding: token.global.spacing.xsmall, // Provides the inner gap between the square box and circular image
	borderRadius: token.global.radius.medium,
	backgroundColor: token.theme.color.background.subtle.normal,
	color: token.theme.color.text.default,
	flexShrink: 0,
	verticalAlign: "middle",
	textDecoration: "none",
	transitionProperty: "background-color, color",
	transitionDuration: token.global.transition.duration.standard,
	transitionTimingFunction: token.global.transition.timing.ease
});

const clickableContainer = style({
	cursor: "pointer",
	":hover": {
		backgroundColor: token.theme.color.background.subtle.hover
	},
	":active": {
		backgroundColor: token.theme.color.background.subtle.pressed
	},
	":focus-visible": {
		outlineWidth: token.global.borderWidth.thick,
		outlineStyle: "solid",
		outlineColor: token.theme.color.border.focus,
		outlineOffset: token.global.spacing.none
	}
});

const baseAvatar = style({
	borderRadius: token.global.radius.full,
	borderWidth: token.global.borderWidth.standard,
	borderStyle: "solid",
	borderColor: token.theme.color.border.default,
	width: "100%",
	height: "100%",
	objectFit: "cover"
});

const size = styleVariants({
	small: { height: token.global.font.size.small, width: token.global.font.size.small },
	medium: { height: token.global.font.size.medium, width: token.global.font.size.medium },
	xmedium: { height: token.global.font.size.xmedium, width: token.global.font.size.xmedium },
	large: { height: token.global.font.size.large, width: token.global.font.size.large },
	xlarge: { height: token.global.font.size.xlarge, width: token.global.font.size.xlarge },
	huge: { height: token.global.font.size.huge, width: token.global.font.size.huge },
	xhuge: { height: token.global.font.size.xhuge, width: token.global.font.size.xhuge }
});

const buttonreset = style({
	background: "none",
	color: "inherit",
	border: "none",
	font: "inherit",
	outline: "inherit"
});

export const styles = {
	avatarContainer,
	clickableContainer,
	baseAvatar,
	size,
	buttonreset
};
