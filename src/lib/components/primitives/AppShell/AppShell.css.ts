import { style } from "@vanilla-extract/css";
import { token } from "../../../styles/designTokens.ts";

const base = style({
	display: "flex",
	flexDirection: "column",
	height: "100vh",
	width: "100vw"
});

const nav = style({
	backgroundColor: token.theme.color.surface.raised.normal,
	height: "48px",
	width: "100%",
	boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
	padding: "0 1.5rem"
});

const sidepanel = style({
	backgroundColor: "blue",
	width: "100%",
	height: "100%"
});

export const styles = {
	base,
	nav,
	sidepanel
};
