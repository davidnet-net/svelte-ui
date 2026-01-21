import { style } from "@vanilla-extract/css";

import { token } from "../../../styles/designTokens.ts";

const baseCard = style({
	backgroundColor: token.theme.color.surface.raised.normal,
	height: "20rem",
	width: "14rem",
	display: "flex",
	alignContent: "center",
	flexDirection: "column",
	lineHeight: token.global.font.lineHeight.normal,
	borderRadius: token.global.radius.huge,
	color: token.theme.color.text.default,
	":hover": {
		outlineColor: token.theme.color.border.default,
		outlineWidth: token.global.borderWidth.thick,
		outlineStyle: "solid",
		color: token.theme.color.text.secondary
	}
});

const illustrationContainer = style({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	height: "50%",
	width: "100%",
	backgroundColor: token.theme.color.surface.sunken.normal,
	borderTopLeftRadius: token.global.radius.huge,
	borderTopRightRadius: token.global.radius.huge
});

const contentContainer = style({
	padding: token.global.spacing.medium
});

export const styles = {
	baseCard,
	illustrationContainer,
	contentContainer
};
