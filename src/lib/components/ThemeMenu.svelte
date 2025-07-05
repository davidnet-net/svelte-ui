<script lang="ts">
	import { theme } from '$lib/stores/theme';
</script>

<select bind:value={$theme} on:change={(e) => theme.setTheme((e.target as HTMLSelectElement)?.value)}>
	<option value="system">Auto</option>
	<option value="light">Light</option>
	<option value="dark">Dark</option>
</select>
