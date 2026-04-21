import { style } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens";

const checkboxContainer = style({
	display: "inline-flex",
	verticalAlign: "middle"
});

const baseCheckbox = style({
	margin: token.global.spacing.none,
	width: token.global.spacing.medium,
	height: token.global.spacing.medium,
	cursor: "pointer"
});

const invalid = style({
	borderColor: token.theme.color.text.danger
});

export const styles = {
	checkboxContainer,
	baseCheckbox,
	invalid
};
