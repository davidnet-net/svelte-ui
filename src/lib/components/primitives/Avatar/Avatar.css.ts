import { style, styleVariants } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens";

const baseAvatar = style({
	borderRadius: token.global.radius.full,
	borderWidth: token.global.borderWidth.standard,
	borderStyle: "solid",
	borderColor: token.theme.color.border.default,
	margin: "1rem"
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

export const styles = {
	baseAvatar,
	clickable,
	size
};
