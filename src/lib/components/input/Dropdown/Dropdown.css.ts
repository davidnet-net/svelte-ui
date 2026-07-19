import { style } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens";

const baseDropdown = style({
	display: "inline-flex",
	position: "relative",
	flexDirection: "column",
	width: "max-content"
});

const dropdownContent = style({
	position: "absolute",
	borderRadius: token.global.radius.medium,
	backgroundColor: token.theme.color.surface.raised.normal,
	minWidth: "100%",
	width: "max-content",
	padding: token.global.spacing.xsmall,
	outline: `${token.global.borderWidth.standard} solid ${token.theme.color.border.highlighted}`,
	zIndex: token.global.zIndex.dropdown,
	display: "flex",
	flexDirection: "column",
	gap: token.global.spacing.xsmall,
	maxHeight: "50vh",
	overflowY: "auto",
	overscrollBehavior: "contain"
});

export const styles = {
	baseDropdown,
	dropdownContent
};
