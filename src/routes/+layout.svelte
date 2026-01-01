<script>
	import AppShell from '$lib/components/primitives/AppShell.svelte';

	let { children } = $props();
</script>

<AppShell>
	{@render children()}
</AppShell>
