import { token } from "../../../styles/designTokens.ts";
import { keyframes, style, styleVariants } from "@vanilla-extract/css";

const shimmereffect = keyframes({
	"0%": { transform: "translateX(-100%)" },
	"100%": { transform: "translateX(100%)" }
});

const baseSkeleton = style({
	backgroundColor: token.theme.color.skeleton.from,
	overflow: "hidden",
	position: "relative",
	display: "inline-block",
	transform: "translateZ(0)"
});

const shimmer = style({
	width: "100%",
	height: "100%",
	position: "absolute",
	top: "0",
	left: "0",
	background: `linear-gradient(90deg, transparent 0%, ${token.theme.color.skeleton.to} 50%, transparent 100%)`,
	animation: `${shimmereffect} ${token.global.transition.duration.xslow} infinite ${token.global.transition.timing.linear}`
});

const radius = styleVariants({
	none: { borderRadius: token.global.radius.none },
	small: { borderRadius: token.global.radius.small },
	medium: { borderRadius: token.global.radius.medium },
	large: { borderRadius: token.global.radius.large },
	xlarge: { borderRadius: token.global.radius.xlarge },
	xxlarge: { borderRadius: token.global.radius.xxlarge },
	full: { borderRadius: token.global.radius.full }
});

export const styles = {
	baseSkeleton,
	shimmer,
	radius
};
