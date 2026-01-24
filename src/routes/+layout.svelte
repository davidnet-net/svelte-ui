<script>
	import AppShell from "$lib/components/primitives/AppShell/AppShell.svelte";
	import Footer from "$lib/internal/components/Footer/Footer.svelte";
	import SidebarNavigation from "$lib/internal/components/SidebarNavigation/SidebarNavigation.svelte";

	import * as paraglideRuntime from "../paraglide/runtime.js";

	let { children } = $props();
</script>

<AppShell appName="Davidnet Design System" shortAppName="DDS" {paraglideRuntime}>
	{#snippet banners()}
		<!--<Banner appearance="warning" icon="frame_source">Davidnet development mode active!</Banner>-->
	{/snippet}
	{#snippet sidebar()}
		<SidebarNavigation />
	{/snippet}
	{@render children()}
	{#snippet footer()}
		<Footer />
	{/snippet}
</AppShell>
