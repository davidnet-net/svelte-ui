import { styleVariants } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens.ts";
import { iconLoadedStyle, icons } from "$lib/styles/icons.css";

const size = styleVariants({
	inherit: { fontSize: "inherit" },
	small: { fontSize: token.global.font.size.small },
	medium: { fontSize: token.global.font.size.medium },
	xmedium: { fontSize: token.global.font.size.xmedium },
	large: { fontSize: token.global.font.size.large },
	xlarge: { fontSize: token.global.font.size.xlarge },
	huge: { fontSize: token.global.font.size.huge },
	xhuge: { fontSize: token.global.font.size.xhuge },
	giant: { fontSize: token.global.font.size.giant }
});

const color = styleVariants({
	inherit: {},
	default: { color: token.theme.color.text.default },
	danger: { color: token.theme.color.text.danger },
	warning: { color: token.theme.color.text.warning },
	success: { color: token.theme.color.text.success }
});

const iconType = icons;

export const styles = {
	iconType,
	size,
	color,
	iconLoadedStyle
};
