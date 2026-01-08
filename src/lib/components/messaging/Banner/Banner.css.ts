import { token } from "../../../styles/designTokens.ts";
import { style, styleVariants } from "@vanilla-extract/css";

const baseBanner = style({
	paddingLeft: token.global.spacing.medium,
	paddingRight: token.global.spacing.medium
});

const message = style({
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
	overflow: "hidden",

	minWidth: 0,
	flex: 1
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
		color: token.theme.color.text.default
	},
	discover: {
		backgroundColor: token.theme.color.background.discover.normal,
		color: token.theme.color.text.default
	},
	information: {
		backgroundColor: token.theme.color.background.information.normal,
		color: token.theme.color.text.UNSAFE.white_default
	},
	success: {
		backgroundColor: token.theme.color.background.success.normal,
		color: token.theme.color.text.UNSAFE.white_default
	}
});

export const styles = {
	baseBanner,
	message,
	appearance
};
