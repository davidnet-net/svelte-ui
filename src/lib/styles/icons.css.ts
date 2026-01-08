import { style } from "@vanilla-extract/css";
import { iconFontName, iconFontRoundedName } from "./fonts.css.ts";

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
	WebkitUserSelect: "none"
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
	WebkitUserSelect: "none"
});

export const icons = {
	outlined,
	filled
};
