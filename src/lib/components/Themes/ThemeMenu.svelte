<script lang="ts">
	import { theme } from '$lib/stores/theme.js';
	import { Dropdown } from '$lib/index.js';

	// Dropdown action handler
	function setTheme(value: any) {
		theme.setTheme(value)
	}
</script>

<Dropdown
	appearance="subtle"
	iconbefore="format_paint"
	actions={[
		{ label: 'Auto', onClick: () => setTheme('system') },
		{ label: 'Light', onClick: () => setTheme('light') },
		{ label: 'Dark', onClick: () => setTheme('dark') }
	]}>
	Theme
</Dropdown>
