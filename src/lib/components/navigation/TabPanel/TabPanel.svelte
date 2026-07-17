<script>
	import { getContext } from "svelte";

	let { value, children } = $props();
	const tabs = getContext("tabs");

	let isActive = $derived(tabs.selected === value);
</script>

{#if isActive}
	<div class="tab-panel" role="tabpanel">
		{@render children()}
	</div>
{/if}
