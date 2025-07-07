<script lang="ts">
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme.js';
	import { Dropdown, IconDropdown } from '$lib/index.js';

	let isMobile = false;

	function checkWidth() {
		isMobile = window.innerWidth < 750;
	}

	// Dropdown action handler
	function setTheme(value: any) {
		theme.setTheme(value);
	}

	onMount(() => {
		checkWidth();
		window.addEventListener('resize', checkWidth);
		return () => window.removeEventListener('resize', checkWidth);
	});
</script>

{#if isMobile}
	<IconDropdown
		appearance="subtle"
		icon="format_paint"
		alt="Theme"
		actions={[
			{ label: 'Auto', onClick: () => setTheme('system') },
			{ label: 'Light', onClick: () => setTheme('light') },
			{ label: 'Dark', onClick: () => setTheme('dark') },
			{ label: 'Highcontrast', onClick: () => setTheme('highcontrast') }
		]}
	/>
{:else}
	<Dropdown
		appearance="subtle"
		iconbefore="format_paint"
		actions={[
			{ label: 'Auto', onClick: () => setTheme('system') },
			{ label: 'Light', onClick: () => setTheme('light') },
			{ label: 'Dark', onClick: () => setTheme('dark') },
			{ label: 'Highcontrast', onClick: () => setTheme('highcontrast') }
		]}>
		Theme
	</Dropdown>
{/if}
