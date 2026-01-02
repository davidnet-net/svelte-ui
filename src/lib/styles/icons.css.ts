import { style } from '@vanilla-extract/css';
import { iconFontName } from './fonts.css.ts';

export const materialIcon = style({
	fontFamily: iconFontName,
	fontWeight: 'normal',
	fontStyle: 'normal',
	fontSize: '24px',
	lineHeight: 1,
	letterSpacing: 'normal',
	textTransform: 'none',
	display: 'inline-block',
	whiteSpace: 'nowrap',
	wordWrap: 'normal',
	direction: 'ltr',
	WebkitFontSmoothing: 'antialiased',
	MozOsxFontSmoothing: 'grayscale',
	fontFeatureSettings: '"liga"'
});