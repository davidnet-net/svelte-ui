import { style } from "@vanilla-extract/css";

import { token } from "../../../styles/designTokens.ts";

const baseShortcut = style({
	display: "flex",
	alignItems: "center",
	gap: "4px",
	marginTop: "2px",
	opacity: 0.8,
	width: "fit-content",
	color: token.theme.color.text.inverse,
	backgroundColor: token.theme.color.surface.inversed.overlay.normal,
	paddingTop: token.global.spacing.xsmall,
	paddingBottom: token.global.spacing.xsmall,
	paddingLeft: token.global.spacing.small,
	paddingRight: token.global.spacing.small,
	fontSize: token.global.font.size.small,
	borderRadius: token.global.radius.small,
	pointerEvents: "none",
	userSelect: "none",
	WebkitUserSelect: "none",
	lineHeight: token.global.font.lineHeight.none,
	fontWeight: token.global.font.weight.regular
});

const key = style({
	fontFamily: "inherit",
	background: token.theme.color.surface.inversed.overlay.pressed,
	padding: "2px 4px",
	borderRadius: "2px",
	fontSize: "0.9em",
	minWidth: "1.2em",
	textAlign: "center"
});

export const styles = {
	baseShortcut,
	key
};
