import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark' | 'highcontrast' | 'system';
const THEME_KEY = 'theme';
const defaultTheme: Theme = 'dark';

const internal = writable<Theme>(defaultTheme);

function applyResolvedTheme(resolved: 'light' | 'dark' | 'highcontrast' ) {
	if (!browser) return;

	const url = new URL(`../../themes/gen/${resolved}.css`, import.meta.url).href;

	let link = document.getElementById('theme-css') as HTMLLinkElement | null;
	if (link) link.remove();

	link = document.createElement('link');
	link.id = 'theme-css';
	link.rel = 'stylesheet';
	link.href = url;
	document.head.appendChild(link);
}

function getPreferredTheme(): 'light' | 'dark' | 'highcontrast' {
	if (window.matchMedia('(prefers-contrast: more)').matches) {
		return 'highcontrast';
	}
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}


function createThemeStore() {
	const { subscribe, set, update } = internal;

	if (browser) {
		const saved = localStorage.getItem(THEME_KEY) as Theme | null;
		const start = saved ?? defaultTheme;
		set(start);

		const mql = window.matchMedia('(prefers-color-scheme: dark)');
		const contrastMql = window.matchMedia('(prefers-contrast: more)');

		// Listen to system theme changes
		const handleChange = () => {
			internal.update((value) => {
				if (value === 'system') applyResolvedTheme(getPreferredTheme());
				return value;
			});
		};
		mql.addEventListener('change', handleChange);
		contrastMql.addEventListener('change', handleChange);

		// React to store changes
		subscribe((value) => {
			localStorage.setItem(THEME_KEY, value);
			const resolved = value === 'system' ? getPreferredTheme() : value;
			applyResolvedTheme(resolved);
		});


		// Check other tabs
		window.addEventListener('storage', (e) => {
			if (e.key === THEME_KEY && e.newValue) {
				set(e.newValue as Theme);
			}
		});
	}

	return {
		subscribe,
		setTheme: (theme: Theme) => set(theme),
		reset: () => set(defaultTheme)
	};
}

export function GetIconColor(currentTheme: string){
	//! LIGHT = LIGHT COLORED ICON
	//! DARK = DARK COLORED ICON

	if (currentTheme === "dark") {
		return "light"
    }
	if (currentTheme === "highcontrast") {
		return "light"
    }
    if (currentTheme === "light") {
		return "dark"
	}
	
	// Fallback to LIGHT theme.
	return "dark"
}

export const theme = createThemeStore();
