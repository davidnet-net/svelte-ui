<script>
	import { getContext } from "svelte";

	import Button from "$lib/components/input/Button/Button.svelte";

	let { value, children } = $props();
	const tabs = getContext("tabs");

	let isActive = $derived(tabs.selected === value);
</script>

<Button role="tab" appearance="subtle" selected={isActive} onclick={() => (tabs.selected = value)}>
	{@render children()}
</Button>
