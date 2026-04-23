import { style, styleVariants } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens";

export const baseFlex = style({
	display: "flex",
	boxSizing: "border-box"
});

export const direction = styleVariants({
	row: { flexDirection: "row" },
	column: { flexDirection: "column" }
});

export const verticalAlign = styleVariants({
	inherit: { verticalAlign: "inherit" },
	middle: { verticalAlign: "middle" }
});

export const justifyContent = styleVariants({
	start: { justifyContent: "flex-start" },
	center: { justifyContent: "center" },
	between: { justifyContent: "space-between" },
	end: { justifyContent: "flex-end" },
	spaceEvenly: { justifyContent: "space-evenly" },
	spaceAround: { justifyContent: "space-around" },
	spaceBetween: { justifyContent: "space-between" }
});

export const text = styleVariants({
	left: { textAlign: "left" },
	center: { textAlign: "center" },
	right: { textAlign: "right" },
	inherit: { textAlign: "inherit" }
});

export const alignItems = styleVariants({
	start: { alignItems: "flex-start" },
	center: { alignItems: "center" },
	stretch: { alignItems: "stretch" },
	end: { alignItems: "flex-end" },
	spaceEvenly: { alignItems: "space-evenly" },
	spaceAround: { alignItems: "space-around" },
	spaceBetween: { alignItems: "space-between" }
});

export const flexGrow = styleVariants({
	"0": { flexGrow: 0 },
	"1": { flexGrow: 1 }
});

export const gap = styleVariants({
	none: { gap: token.global.spacing.none },
	xlarge: { gap: token.global.spacing.xlarge },
	large: { gap: token.global.spacing.large },
	medium: { gap: token.global.spacing.medium },
	small: { gap: token.global.spacing.small },
	xsmall: { gap: token.global.spacing.xsmall }
});

export const overflowX = styleVariants({
	visible: { overflowX: "visible" },
	hidden: { overflowX: "hidden" },
	scroll: { overflowX: "scroll" },
	auto: { overflowX: "auto" }
});

export const overflowY = styleVariants({
	visible: { overflowY: "visible" },
	hidden: { overflowY: "hidden" },
	scroll: { overflowY: "scroll" },
	auto: { overflowY: "auto" }
});

export const marginTop = styleVariants({
	none: { marginTop: token.global.spacing.none },
	xlarge: { marginTop: token.global.spacing.xlarge },
	large: { marginTop: token.global.spacing.large },
	medium: { marginTop: token.global.spacing.medium },
	small: { marginTop: token.global.spacing.small },
	xsmall: { marginTop: token.global.spacing.xsmall }
});

export const marginRight = styleVariants({
	none: { marginRight: token.global.spacing.none },
	xlarge: { marginRight: token.global.spacing.xlarge },
	large: { marginRight: token.global.spacing.large },
	medium: { marginRight: token.global.spacing.medium },
	small: { marginRight: token.global.spacing.small },
	xsmall: { marginRight: token.global.spacing.xsmall }
});

export const marginBottom = styleVariants({
	none: { marginBottom: token.global.spacing.none },
	xlarge: { marginBottom: token.global.spacing.xlarge },
	large: { marginBottom: token.global.spacing.large },
	medium: { marginBottom: token.global.spacing.medium },
	small: { marginBottom: token.global.spacing.small },
	xsmall: { marginBottom: token.global.spacing.xsmall }
});

export const marginLeft = styleVariants({
	none: { marginLeft: token.global.spacing.none },
	xlarge: { marginLeft: token.global.spacing.xlarge },
	large: { marginLeft: token.global.spacing.large },
	medium: { marginLeft: token.global.spacing.medium },
	small: { marginLeft: token.global.spacing.small },
	xsmall: { marginLeft: token.global.spacing.xsmall }
});
