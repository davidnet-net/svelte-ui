import { style } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens";

const modalHeading = style({
	fontSize: token.global.font.size.large
});

const modalHeadingSpacing = style({
	paddingTop: token.global.spacing.medium
});

export const styles = {
	modalHeading,
	modalHeadingSpacing
};
