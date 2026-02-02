import { style, styleVariants } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens.ts";

const baseToaster = style({
	position: "fixed",
	top: 0,
	left: 0,
	zIndex: token.global.zIndex.toaster,
	width: "100vw",
	height: "100vh",
	pointerEvents: "none"
});

const baseLocation = style({
	position: "absolute",
	display: "flex",
	flexDirection: "column",
	gap: token.global.spacing.small,
	pointerEvents: "none"
});

const toastLocation = styleVariants({
	topLeft: [
		baseLocation,
		{
			top: token.global.spacing.medium,
			left: token.global.spacing.medium,
			alignItems: "flex-start"
		}
	],
	topCenter: [
		baseLocation,
		{
			top: token.global.spacing.medium,
			left: "50%",
			transform: "translateX(-50%)",
			alignItems: "center"
		}
	],
	topRight: [
		baseLocation,
		{
			top: token.global.spacing.medium,
			right: token.global.spacing.medium,
			alignItems: "flex-end"
		}
	],
	bottomLeft: [
		baseLocation,
		{
			bottom: token.global.spacing.medium,
			left: token.global.spacing.medium,
			alignItems: "flex-start"
		}
	],
	bottomCenter: [
		baseLocation,
		{
			bottom: token.global.spacing.medium,
			left: "50%",
			transform: "translateX(-50%)",
			alignItems: "center"
		}
	],
	bottomRight: [
		baseLocation,
		{
			bottom: token.global.spacing.medium,
			right: token.global.spacing.medium,
			alignItems: "flex-end"
		}
	]
});

export const styles = {
	baseToaster,
	toastLocation
};
