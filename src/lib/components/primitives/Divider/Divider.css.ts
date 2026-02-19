import { style, styleVariants } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens";

const baseDivider = style({
	width: "100%",
	borderRadius: token.global.radius.full
});

const color = styleVariants({
	default: {
		backgroundColor: token.theme.color.text.default
	},
	secondary: {
		backgroundColor: token.theme.color.text.secondary
	},
	tertiary: {
		backgroundColor: token.theme.color.text.tertiary
	}
});

const thickness = styleVariants({
	standard: {
		height: token.global.borderWidth.standard
	},
	thick: {
		height: token.global.borderWidth.thick
	}
});

export const styles = {
	baseDivider,
	color,
	thickness
};
