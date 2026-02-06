<script lang="ts">
	import Loader from "$lib/components/loading/Spinner/Spinner.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
</script>

<Flex justifyContent="center" alignItems="center" gap="large">
	<Loader size="small" />
	<Loader size="medium" />
	<Loader size="large" />
	<Loader size="huge" />
	<Loader size="xhuge" />
</Flex>
