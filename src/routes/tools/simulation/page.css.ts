import { style } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens";

export const simulationContainer = style({
	position: "relative",
	backgroundColor: token.theme.color.surface.sunken.normal,
	height: "80vh",
	width: "80vw",
	borderRadius: token.global.radius.huge,
	margin: token.global.spacing.xlarge,
	outline: `${token.global.borderWidth.thick} solid ${token.theme.color.border.highlighted}`,
	overflow: "hidden"
});

export const iframeWrapper = style({
	position: "absolute",
	inset: 0,
	display: "flex",
	flexDirection: "column",
	padding: token.global.spacing.medium,
	backgroundColor: token.theme.color.surface.sunken.normal,
	transition: "opacity 0.3s ease-in-out"
});

export const iframe = style({
	flex: 1,
	width: "100%",
	borderRadius: token.global.radius.huge,
	border: "none"
});

export const topbar = style({
	width: "100%",
	height: "48px",
	backgroundColor: token.theme.color.surface.default.normal,
	marginBottom: token.global.spacing.medium,
	paddingRight: token.global.spacing.medium,
	paddingLeft: token.global.spacing.medium,
	borderRadius: token.global.radius.medium,
	display: "flex",
	alignItems: "center"
});
