<script>
	import Banner from "$lib/components/messaging/Banner/Banner.svelte";
	import AppShell from "$lib/components/primitives/AppShell/AppShell.svelte";

	let { children } = $props();
</script>

<AppShell>
	{#snippet banners()}
		<Banner appearance="warning" icon="build">
			<strong>Alert:</strong> Maintenance scheduled for tonight.
		</Banner>
	{/snippet}
	{@render children()}
</AppShell>
