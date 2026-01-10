import { style, styleVariants } from "@vanilla-extract/css";

import { token } from "../../../styles/designTokens.ts";

const baseFlex = style({
	display: "flex",
	boxSizing: "border-box"
});

const direction = styleVariants({
	row: { flexDirection: "row" },
	column: { flexDirection: "column" }
});

const justifyContent = styleVariants({
	start: { justifyContent: "flex-start" },
	center: { justifyContent: "center" },
	between: { justifyContent: "space-between" }
});

const alignItems = styleVariants({
	start: { alignItems: "flex-start" },
	center: { alignItems: "center" },
	stretch: { alignItems: "stretch" }
});

const gap = styleVariants({
	none: { gap: token.global.spacing.none },
	xlarge: { gap: token.global.spacing.xlarge },
	large: { gap: token.global.spacing.large },
	medium: { gap: token.global.spacing.medium },
	small: { gap: token.global.spacing.small },
	xsmall: { gap: token.global.spacing.xsmall }
});

export const styles = {
	baseFlex,
	direction,
	justifyContent,
	alignItems,
	gap
};
