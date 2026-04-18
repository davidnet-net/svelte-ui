import { style } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens";

const baseLink = style({
	display: "inline-flex",
	color: token.theme.color.link.default,
	textDecoration: "none",
	selectors: {
		"&:visited": {
			color: token.theme.color.link.visited
		},
		"&:active": {
			color: token.theme.color.link.pressed
		}
	}
});

export const styles = {
	baseLink
};
