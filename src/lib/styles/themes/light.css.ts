import { createTheme } from '@vanilla-extract/css';
import { token } from '../schema.css.ts';
import { palette } from '../pallete.ts';

export const lightTheme = createTheme(token, {
	color: {
		text: {
			neutral: palette.Neutral1000
		}
	},

	colors: {
		bg: {
			primary: '#ffffff',
			secondary: '#f1f5f9',
			surface: '#ffffff'
		},
		text: {
			primary: '#0f172a',
			secondary: '#64748b'
		},
		brand: '#3b82f6'
	},
	space: {
		sm: '0.5rem',
		md: '1rem',
		lg: '1.5rem'
	},
	fonts: {
		test: 'sans-serif'
	}
});
