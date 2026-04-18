import { style } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens";

export const hashContainer = style({
	display: "inline-flex",
	position: "relative",
	backgroundColor: token.theme.color.surface.sunken.normal,
	borderRadius: token.global.radius.full,
	width: "fit-content",
	paddingLeft: token.global.spacing.medium,
	paddingRight: token.global.spacing.medium,
	paddingTop: token.global.spacing.xsmall,
	paddingBottom: token.global.spacing.xsmall,
	minWidth: "8rem",
	textAlign: "center",
	":hover": {
		backgroundColor: token.theme.color.surface.default.hover
	}
});
