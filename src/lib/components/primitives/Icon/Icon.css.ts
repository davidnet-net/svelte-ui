import { icons, iconLoadedStyle } from "../../../styles/icons.css.ts";
import { token } from "../../../styles/designTokens.ts";
import { styleVariants } from "@vanilla-extract/css";

const size = styleVariants({
	inherit: { fontSize: "inherit" },
	small: { fontSize: token.global.font.size.small },
	medium: { fontSize: token.global.font.size.medium },
	large: { fontSize: token.global.font.size.large },
	xlarge: { fontSize: token.global.font.size.xlarge },
	huge: { fontSize: token.global.font.size.huge },
	xhuge: { fontSize: token.global.font.size.xhuge }
});

const color = styleVariants({
	inherit: {},
	default: { color: token.theme.color.text.default },
	danger: { color: token.theme.color.text.danger },
	warning: { color: token.theme.color.text.warning }
});

const iconType = icons;

export const styles = {
	iconType,
	size,
	color,
	iconLoadedStyle
};
