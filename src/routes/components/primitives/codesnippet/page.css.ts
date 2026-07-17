import { style } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens";

export const pageContainer = style({
	paddingLeft: token.global.spacing.xlarge,
	paddingRight: token.global.spacing.xlarge,
	paddingTop: token.global.spacing.medium,
	paddingBottom: token.global.spacing.medium
});

export const paragraph = style({
	fontSize: token.global.font.size.medium,
	lineHeight: token.global.font.lineHeight.normal,
	width: "60%",
	marginBottom: token.global.spacing.medium,
	"@media": {
		"(max-width: 768px)": {
			width: "100%"
		}
	}
});

export const showcaseContainer = style({
	padding: token.global.spacing.medium,
	backgroundColor: token.theme.color.surface.sunken.normal,
	borderRadius: token.global.radius.huge,
	width: "60%",
	marginBottom: token.global.spacing.large,
	"@media": {
		"(max-width: 768px)": {
			width: "100%"
		}
	}
});

export const showcase = style({
	padding: token.global.spacing.medium,
	backgroundColor: token.theme.color.surface.default.normal,
	borderRadius: token.global.radius.huge,
	width: "100%",
	flexDirection: "column",
	display: "flex",
	gap: token.global.spacing.medium
});
