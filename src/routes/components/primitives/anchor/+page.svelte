<script lang="ts">
	import Anchor from "$lib/components/primitives/Anchor/Anchor.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
</script>

<Flex alignItems="center" justifyContent="center" direction="column" gap="large">
	<Anchor href="">Anchor</Anchor>
	<Anchor external href="https://example.org">Anchor external</Anchor>
	<Anchor opennewtab href="https://davidnet.net">opennewtab</Anchor>
</Flex>
