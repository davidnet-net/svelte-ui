import { style } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens";

const baseForm = style({
	display: "flex",
	flexDirection: "column",
	gap: token.global.spacing.medium
});

export const styles = {
	baseForm
};
