<script>
	import AppShell from "$lib/components/primitives/AppShell/AppShell.svelte";
	import Footer from "$lib/internal/components/Footer/Footer.svelte";

	import * as paraglideRuntime from "../paraglide/runtime.js";

	let { children } = $props();
</script>

<AppShell {paraglideRuntime}>
	{#snippet banners()}
		<!--<Banner appearance="warning" icon="frame_source">Davidnet development mode active!</Banner>-->
	{/snippet}
	{@render children()}
	{#snippet footer()}
		<Footer />
	{/snippet}
</AppShell>
