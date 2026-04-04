import { style } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens";

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
	fontWeight: token.global.font.weight.medium,
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

export const styles = {
	baseToolTip
};
