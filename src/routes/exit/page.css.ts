import { style } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens";

const heading = style({
	color: token.theme.color.text.danger
});

const paragraph = style({
	textAlign: "center",
	maxWidth: "80vw"
});

export const styles = {
	heading,
	paragraph
};
