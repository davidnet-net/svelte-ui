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
	// Use individual padding properties to safely mix with tokens and zero out the bottom
	paddingTop: token.global.spacing.xlarge,
	paddingLeft: token.global.spacing.xlarge,
	paddingRight: token.global.spacing.xlarge,
	paddingBottom: token.global.spacing.medium,
	display: "flex",
	flexDirection: "column", // Changed from 'row' to 'column'
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

// New wrapper to keep text and illustration side-by-side
const topContent = style({
	display: "flex",
	flexDirection: "row",
	flexGrow: 1, // Forces this container to take up all empty space, pushing tabs down
	alignItems: "center" // Vertically centers the text and illustration
});

const header = style({
	fontFamily: token.global.font.family.brand,
	fontSize: token.global.font.size.xhuge
});

// New wrapper to ensure tabs stay perfectly at the bottom
const tabsWrapper = style({
	marginTop: "auto",
	width: "100%"
});

export const styles = {
	baseHeader,
	topContent,
	header,
	tabsWrapper
};
