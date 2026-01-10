import { style } from "@vanilla-extract/css";

import { token } from "../../../styles/designTokens.ts";

const baseToolTip = style({
	position: "absolute",
	top: "100%",
	left: "50%",
	marginTop: "1rem",
	backgroundColor: token.theme.color.surface.inversed.overlay.normal,
	color: token.theme.color.text.inverse,
	paddingTop: token.global.spacing.xsmall,
	paddingBottom: token.global.spacing.xsmall,
	paddingLeft: token.global.spacing.small,
	paddingRight: token.global.spacing.small,
	fontSize: token.global.font.size.small,
	borderRadius: token.global.radius.small,
	maxWidth: "15rem",
	pointerEvents: "none",
	userSelect: "none",
	WebkitUserSelect: "none",
	lineHeight: token.global.font.lineHeight.none,
	fontWeight: token.global.font.weight.regular,
	zIndex: token.global.zIndex.toolTip,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "4px",
	"::after": {
		content: "",
		position: "absolute",
		bottom: "100%",
		left: "50%",
		transform: "translateX(calc(-50% - var(--arrow-offset, 0px)))",
		borderWidth: "0 6px 6px 6px",
		borderStyle: "solid",
		borderColor: `transparent transparent ${token.theme.color.surface.inversed.overlay.normal} transparent`
	}
});

const shortcuts = style({
	display: "flex",
	alignItems: "center",
	gap: "4px",
	marginTop: "2px",
	opacity: 0.8
});

const shortcut = style({
	fontFamily: "inherit",
	background: "rgba(255, 255, 255, 0.15)",
	padding: "2px 4px",
	borderRadius: "2px",
	fontSize: "0.9em",
	minWidth: "1.2em",
	textAlign: "center"
});

export const styles = {
	baseToolTip,
	shortcuts,
	shortcut
};
