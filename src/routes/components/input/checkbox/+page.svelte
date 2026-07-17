<script lang="ts">
	import Checkbox from "$lib/components/input/Checkbox/Checkbox.svelte";
	import Field from "$lib/components/input/Field/Field.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import Header from "$lib/internal/components/Header/Header.svelte";
</script>

<Header heading="Checkbox" paragraph="A checkbox allows selecting one or more items." />

<Flex justifyContent="center" alignItems="center">
	<Field label="Accept the legal policies" name="legal_accept">
		<Checkbox />
	</Field>
</Flex>
