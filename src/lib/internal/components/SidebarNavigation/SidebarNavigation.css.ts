import { style } from "@vanilla-extract/css";

import { token } from "../../../styles/designTokens.ts";

const baseSidebarNavigation = style({
	position: "relative",
	height: "calc(100vh - 48px)",
	width: "15rem",
	padding: token.global.spacing.medium,
	borderRightColor: token.theme.color.border.default,
	borderRightWidth: token.global.borderWidth.thick,
	borderRightStyle: "solid",
	overflow: "auto"
});

export const styles = {
	baseSidebarNavigation
};
