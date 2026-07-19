import { style } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens";

export const pageContainer = style({
	paddingLeft: token.global.spacing.xlarge,
	paddingRight: token.global.spacing.xlarge,
	paddingTop: token.global.spacing.medium,
	paddingBottom: token.global.spacing.medium,
	display: "flex",
	flexDirection: "column",
	gap: token.global.spacing.medium
});
