import { token } from "../../../styles/designTokens.ts";
import { style } from "@vanilla-extract/css";

const baseBlanket = style({
	position: "fixed",
	top: "0",
	left: "0",
	width: "100vw",
	height: "100vh",
	backgroundColor: token.theme.color.blanket,
	zIndex: token.global.zIndex.blanket,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	flexDirection: "column"
});

export const styles = {
	baseBlanket
};
