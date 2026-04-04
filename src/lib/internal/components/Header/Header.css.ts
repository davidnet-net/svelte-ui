import { style } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens";

const s = "179px";
const c1 = token.theme.color.surface.default.normal;
const c2 = token.theme.color.surface.sunken.normal;
const _g = `#0000 52%, ${c1} 54% 57%, #0000 59%`;

const baseHeader = style({
	backgroundColor: token.theme.color.surface.sunken.normal,
	height: "20rem",
	maxHeight: "fit-content",
	width: "100%",
	padding: token.global.spacing.xlarge,
	display: "flex",
	alignContent: "center",
	flexDirection: "row",
	lineHeight: token.global.font.lineHeight.normal,
	fontSize: token.global.font.size.xmedium,
	vars: {
		"--s": s,
		"--c1": c1,
		"--c2": c2
	},
	backgroundImage: `
    radial-gradient(farthest-side at -33.33% 50%, ${_g}),
    radial-gradient(farthest-side at 50% 133.33%, ${_g}),
    radial-gradient(farthest-side at 133.33% 50%, ${_g}),
    radial-gradient(farthest-side at 50% -33.33%, ${_g})
  `,
	backgroundPosition: `
    0 calc(${s} / 2),
    calc(${s} / 2) 0,
    0 0,
    0 0
  `,
	backgroundSize: `
    calc(${s} / 4.667) ${s},
    ${s} calc(${s} / 4.667)
  `
});

const header = style({
	fontFamily: token.global.font.family.brand,
	fontSize: token.global.font.size.xhuge
});

export const styles = {
	baseHeader,
	header
};
