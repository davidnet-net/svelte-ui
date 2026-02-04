import { style } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens";

const baseDropdown = style({
	display: "flex",
	position: "relative",
	flexDirection: "column"
});

const dropdownContent = style({
	position: "absolute",
	top: "100%",
	left: 0,
	marginTop: token.global.spacing.small,
	borderRadius: token.global.radius.medium,
	backgroundColor: token.theme.color.surface.raised.normal,
	minWidth: "100%",
	width: "fit-content",
	padding: token.global.spacing.xsmall,
	outline: `${token.global.borderWidth.standard} solid ${token.theme.color.border.highlighted}`
});

export const styles = {
	baseDropdown,
	dropdownContent
};
