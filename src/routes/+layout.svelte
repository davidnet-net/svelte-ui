<script>
	import AppShell from "$lib/components/primitives/AppShell/AppShell.svelte";

	let { children } = $props();
</script>

<AppShell>
	{#snippet banners()}
		<!--<Banner appearance="warning" icon="frame_source">Davidnet development mode active!</Banner>-->
	{/snippet}
	{@render children()}
</AppShell>
