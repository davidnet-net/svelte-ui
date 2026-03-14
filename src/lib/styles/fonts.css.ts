import { globalFontFace, style } from "@vanilla-extract/css";

import interUrl from "$lib/assets/fonts/Inter-4.1/InterVariable.woff2";
import interItalicUrl from "$lib/assets/fonts/Inter-4.1/InterVariable-Italic.woff2";
import iconFontUrl from "$lib/assets/fonts/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MrImHCIJIZrDCvHOej.woff2";
import momoTrustDisplayUrl from "$lib/assets/fonts/Momo_Trust_Display/MomoTrustDisplay-Regular.woff2";
import iconFontRoundedUrl from "$lib/assets/fonts/syl0-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190FjpZIvDmUSVOK7BDJ_vb9vUSzq3wzLK-P0J-V_Zs-QtQth3-jOcbTCVpeRL2w5rwZu2rFmiXxc.woff2";

export const interFallbackName = "Inter Fallback";
export const interFontName = "Inter";
export const iconFontName = "Material Symbols Outlined";
export const iconFontRoundedName = "Material Symbols Rounded";
export const momoTrustDisplayFontName = "Momo Trust Display";

globalFontFace(interFontName, {
	src: `url("${interUrl}") format("woff2")`,
	fontDisplay: "swap",
	fontWeight: "100 900",
	fontStyle: "normal"
});

globalFontFace(momoTrustDisplayFontName, {
	src: `url("${momoTrustDisplayUrl}") format("woff2")`,
	fontDisplay: "optional",
	fontWeight: "400",
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
	fontDisplay: "block",
	fontWeight: "400",
	src: `url("${iconFontRoundedUrl}") format("woff2")`
});

globalFontFace(iconFontName, {
	fontStyle: "normal",
	fontDisplay: "block",
	fontWeight: "400",
	src: `url("${iconFontUrl}") format("woff2")`
});

globalFontFace(interFallbackName, {
	src: 'local("Arial")',
	ascentOverride: "90%",
	descentOverride: "22.5%",
	lineGapOverride: "0%",
	sizeAdjust: "107%"
});

export const tabularNums = style({
	fontVariantNumeric: "tabular-nums"
});
