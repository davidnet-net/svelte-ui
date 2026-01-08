import { globalFontFace, style } from "@vanilla-extract/css";

import interUrl from "../assets/Inter-4.1/InterVariable.woff2";
import interItalicUrl from "../assets/Inter-4.1/InterVariable-Italic.woff2";
import iconFontUrl from "../assets/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MrImHCIJIZrDCvHOej.woff2";
import iconFontRoundedUrl from "../assets/syl0-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190FjpZIvDmUSVOK7BDJ_vb9vUSzq3wzLK-P0J-V_Zs-QtQth3-jOcbTCVpeRL2w5rwZu2rFmiXxc.woff2";

export const interFontName = "Inter";
export const iconFontName = "Material Symbols Outlined";
export const iconFontRoundedName = "Material Symbols Rounded";

globalFontFace(interFontName, {
	src: `url("${interUrl}") format("woff2")`,
	fontDisplay: "swap",
	fontWeight: "100 900",
	fontStyle: "normal"
});

globalFontFace(interFontName, {
	src: `url("${interItalicUrl}") format("woff2")`,
	fontDisplay: "swap",
	fontWeight: "100 900",
	fontStyle: "italic"
});

globalFontFace(iconFontRoundedName, {
	fontStyle: "normal",
	fontWeight: "400",
	src: `url("${iconFontRoundedUrl}") format("woff2")`
});

globalFontFace(iconFontName, {
	fontStyle: "normal",
	fontWeight: "400",
	src: `url("${iconFontUrl}") format("woff2")`
});

export const tabularNums = style({
	fontVariantNumeric: "tabular-nums"
});
