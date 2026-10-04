import { style } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens";

const wrapper = style({
	position: "relative",
	width: "100%",
	aspectRatio: "16 / 9",
	borderRadius: token.global.radius.medium,
	overflow: "hidden",
	backgroundColor: token.theme.color.surface.sunken.normal
});

const frame = style({
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	border: "none"
});

export const styles = {
	wrapper,
	frame
};
