import { style, styleVariants, keyframes } from "@vanilla-extract/css";
import { token } from "../../../styles/designTokens.ts";

const rotate = keyframes({
	"0%": { transform: "rotate(0deg)" },
	"100%": { transform: "rotate(360deg)" }
});

const prixClipFix = keyframes({
	"0%": { clipPath: "polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)" },
	"25%": { clipPath: "polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)" },
	"50%": { clipPath: "polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)" },
	"75%": { clipPath: "polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)" },
	"100%": { clipPath: "polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)" }
});

const baseLoader = style({
	display: "inline-block",
	borderRadius: "50%",
	position: "relative",
	animation: `${rotate} 1s linear infinite`,
	"::before": {
		content: '""',
		boxSizing: "border-box",
		position: "absolute",
		inset: "0px",
		borderRadius: "50%",
		borderStyle: "solid",
		borderColor: token.theme.color.text.default,
		animation: `${prixClipFix} 2s linear infinite`
	}
});

// Updated to map your specific token keys to the variant names
const sizeConfig = {
	small: { tokenKey: "small", borderWidth: "2px" },
	medium: { tokenKey: "medium", borderWidth: "2px" },
	large: { tokenKey: "large", borderWidth: "4px" },
	xlarge: { tokenKey: "xlarge", borderWidth: "5px" },
	huge: { tokenKey: "huge", borderWidth: "6px" },
	xhuge: { tokenKey: "xhuge", borderWidth: "8px" }
} as const;

const size = styleVariants(sizeConfig, (config) => [
	{
		width: token.global.font.size[config.tokenKey],
		height: token.global.font.size[config.tokenKey],
		selectors: {
			"&::before": {
				borderWidth: config.borderWidth
			}
		}
	}
]);

export const styles = {
	baseLoader,
	size
};
