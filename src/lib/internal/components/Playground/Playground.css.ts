import { style } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens";

export const container = style({
	display: "flex",
	flexDirection: "column",
	width: "100%",
	border: `${token.global.borderWidth.standard} solid ${token.theme.color.border.default}`,
	borderRadius: token.global.radius.large,
	overflow: "hidden",
	backgroundColor: token.theme.color.surface.default.normal,
	boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
	transition: `all ${token.global.transition.duration.standard} ${token.global.transition.timing.ease}`
});

export const iframeWrapper = style({
	width: "100%",
	backgroundColor: token.theme.color.surface.raised.normal,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	position: "relative",
	transition: `background-color ${token.global.transition.duration.standard} ${token.global.transition.timing.ease}`
});

export const previewIframe = style({
	width: "100%",
	height: "100%",
	border: "none",
	display: "block"
});

export const snippetWrapper = style({
	borderTop: `${token.global.borderWidth.standard} solid ${token.theme.color.border.default}`,
	transition: `border-color ${token.global.transition.duration.standard} ${token.global.transition.timing.ease}`
});

export const styles = {
	container,
	iframeWrapper,
	previewIframe,
	snippetWrapper
};
