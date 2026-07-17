import { globalStyle, style } from "@vanilla-extract/css";

import { token } from "$lib/styles/designTokens";

export const container = style({
	backgroundColor: token.theme.color.surface.sunken.normal,
	border: `${token.global.borderWidth.standard} solid ${token.theme.color.border.default}`,
	borderRadius: token.global.radius.large,
	overflow: "hidden",
	display: "flex",
	flexDirection: "column",
	fontFamily:
		'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
	position: "relative",
	width: "100%",
	boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
	transition: `background-color ${token.global.transition.duration.standard} ${token.global.transition.timing.ease}, border-color ${token.global.transition.duration.standard} ${token.global.transition.timing.ease}`
});

export const header = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: `${token.global.spacing.small} ${token.global.spacing.medium}`,
	backgroundColor: token.theme.color.surface.default.normal,
	borderBottom: `${token.global.borderWidth.standard} solid ${token.theme.color.border.default}`,
	userSelect: "none",
	transition: `background-color ${token.global.transition.duration.standard} ${token.global.transition.timing.ease}, border-color ${token.global.transition.duration.standard} ${token.global.transition.timing.ease}`
});

export const headerLeft = style({
	display: "flex",
	alignItems: "center",
	gap: token.global.spacing.small,
	color: token.theme.color.text.secondary,
	fontSize: token.global.font.size.small,
	fontWeight: token.global.font.weight.medium
});

export const headerRight = style({
	display: "flex",
	alignItems: "center",
	gap: token.global.spacing.medium
});

export const filename = style({
	color: token.theme.color.text.default,
	fontWeight: token.global.font.weight.heavy
});

export const languageBadge = style({
	fontSize: "10px",
	fontWeight: token.global.font.weight.bold,
	textTransform: "uppercase",
	padding: "2px 6px",
	borderRadius: token.global.radius.small,
	backgroundColor: token.theme.color.background.subtle.hover,
	color: token.theme.color.text.secondary,
	letterSpacing: "0.05em"
});

export const copyButton = style({
	background: "transparent",
	border: "none",
	color: token.theme.color.text.secondary,
	cursor: "pointer",
	padding: token.global.spacing.xsmall,
	borderRadius: token.global.radius.small,
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	transition: `all ${token.global.transition.duration.fast} ${token.global.transition.timing.ease}`,
	":hover": {
		backgroundColor: token.theme.color.background.subtle.hover,
		color: token.theme.color.text.default
	},
	":active": {
		backgroundColor: token.theme.color.background.subtle.pressed
	}
});

export const body = style({
	display: "flex",
	margin: 0,
	padding: `${token.global.spacing.medium} 0`,
	overflowX: "auto",
	position: "relative"
});

export const codeArea = style({
	margin: 0,
	padding: `0 ${token.global.spacing.medium}`,
	flex: 1,
	fontSize: "14px",
	lineHeight: "1.6",
	color: token.theme.color.text.default,
	whiteSpace: "pre",
	wordBreak: "normal",
	wordWrap: "normal"
});

export const lineNumbersGutter = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-end",
	paddingLeft: token.global.spacing.medium,
	paddingRight: token.global.spacing.medium,
	borderRight: `${token.global.borderWidth.standard} solid ${token.theme.color.border.default}`,
	userSelect: "none",
	textAlign: "right",
	color: token.theme.color.text.tertiary,
	minWidth: "2.5rem",
	fontSize: "14px",
	lineHeight: "1.6",
	opacity: 0.6
});

export const lineNumber = style({
	display: "block"
});

// Style syntax tokens using the semantic colors of the design tokens
globalStyle(
	`${codeArea} .token.comment, ${codeArea} .token.prolog, ${codeArea} .token.doctype, ${codeArea} .token.cdata`,
	{
		color: token.theme.color.text.tertiary,
		fontStyle: "italic"
	}
);

globalStyle(`${codeArea} .token.punctuation`, {
	color: token.theme.color.text.secondary
});

globalStyle(
	`${codeArea} .token.property, ${codeArea} .token.tag, ${codeArea} .token.boolean, ${codeArea} .token.number, ${codeArea} .token.constant, ${codeArea} .token.symbol, ${codeArea} .token.deleted`,
	{
		color: token.theme.color.text.warning
	}
);

globalStyle(
	`${codeArea} .token.selector, ${codeArea} .token.attr-name, ${codeArea} .token.string, ${codeArea} .token.char, ${codeArea} .token.builtin, ${codeArea} .token.inserted`,
	{
		color: token.theme.color.text.success
	}
);

globalStyle(
	`${codeArea} .token.operator, ${codeArea} .token.entity, ${codeArea} .token.url, ${codeArea} .token.variable`,
	{
		color: token.theme.color.text.secondary
	}
);

globalStyle(
	`${codeArea} .token.atrule, ${codeArea} .token.attr-value, ${codeArea} .token.keyword`,
	{
		color: token.theme.color.text.primary
	}
);

globalStyle(`${codeArea} .token.function, ${codeArea} .token.class-name`, {
	color: token.theme.color.text.discover
});

globalStyle(`${codeArea} .token.regex, ${codeArea} .token.important`, {
	color: token.theme.color.text.danger
});

globalStyle(`${codeArea} .token.bold`, {
	fontWeight: "bold"
});

globalStyle(`${codeArea} .token.italic`, {
	fontStyle: "italic"
});

export const styles = {
	container,
	header,
	headerLeft,
	headerRight,
	filename,
	languageBadge,
	copyButton,
	body,
	codeArea,
	lineNumbersGutter,
	lineNumber
};
