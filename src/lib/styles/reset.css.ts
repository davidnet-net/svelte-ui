import { globalStyle } from '@vanilla-extract/css';
import { token } from './schema.css.ts';

globalStyle('*, *::before, *::after', {
	boxSizing: 'border-box'
});

globalStyle('*', {
	margin: 0,
	padding: 0
});

globalStyle('.appshell', {
	lineHeight: 1.1,
	WebkitFontSmoothing: 'antialiased',
	fontFamily: token.fonts.test,
	backgroundColor: token.colors.bg.primary,
	minHeight: '100vh',
	minWidth: '100vw',
});

globalStyle('img, picture, video, canvas, svg', {
	display: 'block',
	maxWidth: '100%'
});

globalStyle('input, button, textarea, select', {
	font: 'inherit'
});
