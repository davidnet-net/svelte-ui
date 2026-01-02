import { globalStyle } from "@vanilla-extract/css";
import { token } from "./designTokens.ts";
import { interFontName } from "./fonts.css.ts";

globalStyle("*, *::before, *::after", {
	boxSizing: "border-box"
});

globalStyle("*", {
	margin: 0,
	padding: 0
});

globalStyle(".appshell", {
	backgroundColor: token.theme.color.surface.default.normal,
	
	minHeight: "100vh",
	minWidth: "100vw",
	
	fontFamily: token.global.font.family.sans,
	fontWeight: token.global.font.weight.regular,
	WebkitFontSmoothing: 'antialiased',
	MozOsxFontSmoothing: 'grayscale',
});

globalStyle("img, picture, video, canvas, svg", {
	display: "block",
	maxWidth: "100%"
});

globalStyle("input, button, textarea, select", {
	font: "inherit"
});
