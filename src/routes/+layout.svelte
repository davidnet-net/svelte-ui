<script>
	import { page } from "$app/state";
	import AppShell from "$lib/components/primitives/AppShell/AppShell.svelte";
	import Footer from "$lib/internal/components/Footer/Footer.svelte";
	import SidebarNavigation from "$lib/internal/components/SidebarNavigation/SidebarNavigation.svelte";
	import * as paraglideRuntime from "$lib/paraglide/runtime.js";

	let { children } = $props();

	let isRunner = $derived(page.route.id?.startsWith("/tools/simulation/runner"));
</script>

{#if isRunner}
	{@render children()}
{:else}
	<AppShell appName="Davidnet Design System" shortAppName="DDS" {paraglideRuntime}>
		{#snippet banners()}{/snippet}
		<!--<Banner appearance="warning" icon="frame_source">Davidnet development mode active!</Banner>-->
		{#snippet sidebar()}
			<SidebarNavigation />
		{/snippet}
		{@render children()}
		{#snippet footer()}
			<Footer />
		{/snippet}
	</AppShell>
{/if}
