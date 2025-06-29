<script lang="ts">
	import { onMount } from "svelte";

	let currentTheme = "light";

	function changeTheme(theme: string) {
		currentTheme = theme;
		localStorage.setItem("theme", theme);

		const url = new URL(`../../themes/gen/${theme}.css`, import.meta.url).href;

		let link = document.getElementById("theme-css") as HTMLLinkElement | null;
		if (link) link.remove();

		link = document.createElement("link");
		link.id = "theme-css";
		link.rel = "stylesheet";
		link.href = url;
		document.head.appendChild(link);
	}

	onMount(() => {
		currentTheme = localStorage.getItem("theme") ?? "light";
	});
</script>

<select bind:value={currentTheme} on:change={(e) => changeTheme((e.target as HTMLSelectElement).value)}>
	<option value="light">Light</option>
	<option value="dark">Dark</option>
</select>
