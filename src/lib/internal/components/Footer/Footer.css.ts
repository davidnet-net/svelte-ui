import { style } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens.ts";

const baseFooter = style({
	width: "100%",
	height: "fit-content",
	borderTopColor: token.theme.color.border.default,
	borderTopStyle: "solid",
	borderTopWidth: token.global.borderWidth.thick,
	color: token.theme.color.text.secondary
});

const content = style({
	width: "100%",
	height: "fit-content",
	padding: token.global.spacing.medium
});

const brand = style({
	width: "100%",
	height: "fit-content",
	fontFamily: token.global.font.family.brand,
	fontSize: token.global.font.size.xmedium
});

const legal = style({
	width: "100%",
	height: "fit-content",
	padding: token.global.spacing.medium,
	borderTopColor: token.theme.color.border.default,
	borderTopStyle: "solid",
	borderTopWidth: token.global.borderWidth.thick,
	color: token.theme.color.text.tertiary,
	fontSize: token.global.font.size.medium
});

const heading = style({
	fontSize: token.global.font.size.xmedium
});

const footerLink = style({
	verticalAlign: "middle",
	cursor: "pointer",
	":hover": {
		color: token.theme.color.text.tertiary,
		textDecorationLine: "underline",
		textDecorationColor: "gray"
	}
});

export const styles = {
	brand,
	content,
	baseFooter,
	legal,
	heading,
	footerLink
};
