import { style, styleVariants } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens";

const baseAvatar = style({
	borderRadius: token.global.radius.full,
	borderWidth: token.global.borderWidth.standard,
	borderStyle: "solid",
	borderColor: token.theme.color.border.default
});

const clickable = style({
	cursor: "pointer",
	":hover": {
		outlineWidth: token.global.borderWidth.thick,
		outlineStyle: "solid",
		outlineColor: token.theme.color.border.highlighted
	},
	":active": {
		outlineColor: token.theme.color.border.selected
	},
	":focus": {
		outlineWidth: token.global.borderWidth.thick,
		outlineStyle: "solid",
		outlineColor: token.theme.color.border.focus,
		outlineOffset: token.global.spacing.none
	}
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
	padding: 0,
	font: "inherit",
	cursor: "pointer",
	outline: "inherit",
	display: "inline-flex",
	borderRadius: "50%",
	verticalAlign: "middle",
	":focus-visible": {
		outline: "2px solid currentColor",
		outlineOffset: "2px"
	}
});

export const styles = {
	baseAvatar,
	clickable,
	size,
	buttonreset
};
