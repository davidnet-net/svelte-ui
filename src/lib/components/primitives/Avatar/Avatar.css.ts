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
	small: { height: "1.5rem", width: "1.5rem" },
	medium: { height: "2rem", width: "2rem" },
	xmedium: { height: "2.5rem", width: "2.5rem" },
	large: { height: "3rem", width: "3rem" },
	xlarge: { height: "4rem", width: "4rem" },
	huge: { height: "5rem", width: "5rem" },
	xhuge: { height: "6rem", width: "6rem" },
	giant: { height: "7rem", width: "7rem" },
	xgiant: { height: "10rem", width: "10rem" },
	xxgiant: { height: "15rem", width: "15rem" }
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
