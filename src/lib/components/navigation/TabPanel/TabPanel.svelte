<script lang="ts">
	import { getContext } from "svelte";
	import { fade } from "svelte/transition";

	let { value, children } = $props();
	const tabs: TabsContext = getContext("tabs");

	interface TabsContext {
		selected: string;
	}

	let isActive = $derived(tabs.selected === value);
</script>

{#if isActive}
	<div
		class="tab-panel"
		role="tabpanel"
		in:fade={{ duration: 180, delay: 90 }}
		out:fade={{ duration: 90 }}>
		{@render children()}
	</div>
{/if}
