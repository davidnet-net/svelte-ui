<script lang="ts">
	import { onMount } from "svelte";
	import { theme } from "$lib/stores/theme.js";
	import { Dropdown, IconDropdown } from "$lib/index.js";

	export let forceicon: boolean | undefined = false;
	export let forcetext: boolean | undefined = false;

	let isMobile = false;

	function checkWidth() {
		if (forceicon && !forcetext) {
			isMobile = true;
		} else if (forcetext && !forceicon) {
			isMobile = false;
		} else {
			isMobile = window.innerWidth < 750;
		}
	}

	// Dropdown action handler
	function setTheme(value: "system" | "light" | "dark" | "highcontrast" | "halloween" | "christmas" ) {
		theme.setTheme(value);
	}

	onMount(() => {
		checkWidth();
		window.addEventListener("resize", checkWidth);
		return () => window.removeEventListener("resize", checkWidth);
	});
</script>

{#if isMobile}
	<IconDropdown
		appearance="subtle"
		icon="format_paint"
		alt="Theme"
		actions={[
			{ label: "System (Auto)", onClick: () => setTheme("system") },
			{ label: "Light", onClick: () => setTheme("light") },
			{ label: "Dark", onClick: () => setTheme("dark") },
			{ label: "Highcontrast", onClick: () => setTheme("highcontrast") },
			{ label: "Christmas", onClick: () => setTheme("christmas") },
			{ label: "Halloween", onClick: () => setTheme("halloween") }
		]}
	/>
{:else}
	<Dropdown
		appearance="subtle"
		iconbefore="format_paint"
		alwaysshowslot
		actions={[
			{ label: "System (auto)", onClick: () => setTheme("system"), iconbefore: "routine" },
			{ label: "Light", onClick: () => setTheme("light"), iconbefore: "light_mode" },
			{ label: "Dark", onClick: () => setTheme("dark"), iconbefore: "dark_mode" },
			{ label: "Highcontrast", onClick: () => setTheme("highcontrast"), iconbefore: "contrast" },
			{ label: "Christmas", onClick: () => setTheme("christmas"), iconbefore: "featured_seasonal_and_gifts" },
			{ label: "Halloween", onClick: () => setTheme("halloween"), iconbefore: "skull" }
		]}
	>
		Theme
	</Dropdown>
{/if}
