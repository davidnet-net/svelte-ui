import { style, styleVariants } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens";

const dropzone = style({
	position: "relative",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	gap: token.global.spacing.xsmall,
	width: "100%",
	minHeight: "8rem",
	borderRadius: token.global.radius.medium,
	border: `${token.global.borderWidth.thick} dashed ${token.theme.color.border.default}`,
	backgroundColor: token.theme.color.surface.sunken.normal,
	color: token.theme.color.text.tertiary,
	cursor: "pointer",
	overflow: "hidden",
	transitionProperty: "background-color, border-color",
	transitionDuration: token.global.transition.duration.standard,
	transitionTimingFunction: token.global.transition.timing.ease,
	":hover": {
		borderColor: token.theme.color.border.selected
	}
});

const dragOver = style({
	borderColor: token.theme.color.border.selected,
	backgroundColor: token.theme.color.background.subtle.hover
});

const hiddenInput = style({
	position: "absolute",
	width: 0,
	height: 0,
	opacity: 0,
	overflow: "hidden"
});

const previewContainer = style({
	position: "relative",
	width: "100%",
	minHeight: "8rem",
	borderRadius: token.global.radius.medium,
	overflow: "hidden"
});

const previewImage = style({
	display: "block",
	width: "100%",
	height: "100%",
	objectFit: "cover"
});

const removeButton = style({
	position: "absolute",
	top: token.global.spacing.xsmall,
	right: token.global.spacing.xsmall
});

const state = styleVariants({
	idle: {},
	disabled: {
		cursor: "not-allowed",
		opacity: 0.6
	}
});

export const styles = {
	dropzone,
	dragOver,
	hiddenInput,
	previewContainer,
	previewImage,
	removeButton,
	state
};
