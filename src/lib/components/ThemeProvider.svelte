<script lang="ts">
	import { onMount } from "svelte";

	export let defaultTheme: string = "light";

	const THEME_KEY = "theme";

	function getStoredTheme(): string | null {
		return localStorage.getItem(THEME_KEY);
	}

	function applyTheme(theme: string) {
		const url = new URL(`../../themes/gen/${theme}.css`, import.meta.url).href;

		let link = document.getElementById("theme-css") as HTMLLinkElement | null;
		if (link) link.remove();

		link = document.createElement("link");
		link.id = "theme-css";
		link.rel = "stylesheet";
		link.href = url;
		document.head.appendChild(link);
	}

	function LoadFonts() {
		const remoteUrl = "https://design.davidnet.net/fonts/fonts.css";
		const localUrl = "/fonts/fonts.css";

		let link = document.getElementById("fonts-css") as HTMLLinkElement | null;
		if (link) link.remove();

		link = document.createElement("link");
		link.id = "fonts-css";
		link.rel = "stylesheet";
		link.href = remoteUrl;

		link.onerror = () => {
			console.warn("Falling back to local fonts.");
			link.remove();

			const fallback = document.createElement("link");
			fallback.id = "fonts-css";
			fallback.rel = "stylesheet";
			fallback.href = localUrl;
			document.head.appendChild(fallback);
		};

		document.head.appendChild(link);
	}

	onMount(async () => {
		const saved = getStoredTheme();
		const themeToTry = saved ?? defaultTheme;
		const urlToTry = new URL(`../../themes/gen/${themeToTry}.css`, import.meta.url).href;

		try {
			const res = await fetch(urlToTry, { method: "HEAD" });
			if (!res.ok) throw new Error("Theme not found");
			applyTheme(themeToTry);
		} catch (e) {
			console.warn(`Theme "${themeToTry}" not found. Falling back to default theme "${defaultTheme}"`);
			localStorage.setItem(THEME_KEY, defaultTheme);
			applyTheme(defaultTheme);
		}

		LoadFonts();
	});

</script>
