import { style, styleVariants } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens.ts";

const baseSidebar = style({
	position: "relative",
	width: "15rem",
	padding: token.global.spacing.medium,
	borderRightColor: token.theme.color.border.default,
	borderRightWidth: token.global.borderWidth.thick,
	borderRightStyle: "solid",
	display: "flex",
	flexDirection: "column",
	gap: token.global.spacing.small
});

const baseSidebarNavigation = styleVariants({
	desktop: [baseSidebar, { height: "calc(100dvh - 48px)" }],
	mobile: [baseSidebar, { height: "100dvh" }]
});

const navigation = style({
	overflow: "auto",
	height: "calc(100%)"
});

const bottom = style({
	flex: 1
});

export const styles = {
	baseSidebarNavigation,
	navigation,
	bottom
};
