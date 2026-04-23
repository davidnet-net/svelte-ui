import { style, styleVariants } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens";

const baseToast = style({
	display: "flex",
	alignItems: "flex-start",
	backgroundColor: token.theme.color.surface.overlay.normal,
	color: token.theme.color.text.default,
	borderRadius: token.global.radius.medium,
	paddingLeft: token.global.spacing.medium,
	paddingRight: token.global.spacing.medium,
	paddingTop: token.global.spacing.small,
	paddingBottom: token.global.spacing.medium,
	boxShadow: "0 0 6px rgba(0, 0, 0, 0.2)",
	minWidth: 280,
	maxWidth: 360,
	position: "relative",
	pointerEvents: "auto",
	outline: "none"
});

const appearance = styleVariants({
	danger: {
		backgroundColor: token.theme.color.background.danger.normal,
		color: token.theme.color.text.UNSAFE.dark_default
	},
	warning: {
		backgroundColor: token.theme.color.background.warning.normal,
		color: token.theme.color.text.UNSAFE.white_default
	},
	primary: {
		backgroundColor: token.theme.color.background.primary.normal,
		color: token.theme.color.text.UNSAFE.dark_default
	},
	discover: {
		backgroundColor: token.theme.color.background.discover.normal,
		color: token.theme.color.text.default
	},
	success: {
		backgroundColor: token.theme.color.background.success.normal,
		color: token.theme.color.text.UNSAFE.white_default
	},
	subtle: {
		backgroundColor: token.theme.color.background.subtle.normal,
		color: token.theme.color.text.default
	}
});

const title = style({
	fontWeight: token.global.font.weight.medium,
	textWrap: "wrap",
	maxWidth: "27ch",
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis",
	fontSize: token.global.font.size.medium,
	margin: "0px",
	padding: "0px"
});

export const styles = {
	appearance,
	baseToast,
	title
};
