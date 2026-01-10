import { style } from "@vanilla-extract/css";
import { iconFontName, iconFontRoundedName } from "./fonts.css.ts";
import { token } from "./designTokens.ts";

const outlined = style({
	fontFamily: iconFontName,
	fontWeight: "normal",
	fontStyle: "normal",
	lineHeight: 1,
	letterSpacing: "normal",
	textTransform: "none",
	display: "inline-block",
	whiteSpace: "nowrap",
	wordWrap: "normal",
	direction: "ltr",
	WebkitFontSmoothing: "antialiased",
	MozOsxFontSmoothing: "grayscale",
	fontFeatureSettings: '"liga"',
	userSelect: "none",
	WebkitUserSelect: "none",
	opacity: 0,
	transition: `opacity ${token.global.transition.duration.standard} ${token.global.transition.timing.easeIn}`
});

const filled = style({
	fontFamily: iconFontRoundedName,
	fontWeight: "normal",
	fontStyle: "normal",
	lineHeight: 1,
	letterSpacing: "normal",
	textTransform: "none",
	display: "inline-block",
	whiteSpace: "nowrap",
	wordWrap: "normal",
	direction: "ltr",
	WebkitFontSmoothing: "antialiased",
	MozOsxFontSmoothing: "grayscale",
	fontFeatureSettings: '"liga"',
	userSelect: "none",
	WebkitUserSelect: "none",
	opacity: 0,
	transition: `opacity ${token.global.transition.duration.standard} ${token.global.transition.timing.easeIn}`,
	width: "1em",
	height: "1em"
});

export const iconLoadedStyle = style({
	opacity: 1
});

export const icons = {
	outlined,
	filled
};
