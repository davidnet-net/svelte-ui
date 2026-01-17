import { style } from "@vanilla-extract/css";

import { token } from "../../lib/styles/designTokens.ts";

const pageContainer = style({
	padding: token.global.spacing.xlarge
});

const card = {};

export const styles = {
	pageContainer,
	card
};
