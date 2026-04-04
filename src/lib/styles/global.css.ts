import { globalStyle, style } from "@vanilla-extract/css";

import { token } from "./designTokens";

globalStyle("*, *::before, *::after", {
	boxSizing: "border-box"
});

globalStyle("*", {
	margin: 0,
	padding: 0
});

globalStyle("b", {
	fontWeight: token.global.font.weight.bold
});

globalStyle(".appshell", {
	backgroundColor: token.theme.color.surface.default.normal,

	minHeight: "100vh",
	minWidth: "100vw",

	fontFamily: token.global.font.family.sans,
	fontWeight: token.global.font.weight.regular,
	fontSize: token.global.font.size.medium,
	color: token.theme.color.text.default,

	WebkitFontSmoothing: "antialiased",
	MozOsxFontSmoothing: "grayscale"
});

export const focusring = style({
	":focus-visible": {
		outlineWidth: token.global.borderWidth.thick,
		outlineStyle: "solid",
		outlineColor: token.theme.color.border.focus,
		outlineOffset: token.global.spacing.none
	}
});
