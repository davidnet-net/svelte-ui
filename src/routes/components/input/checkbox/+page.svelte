<script>
	import Checkbox from "$lib/components/input/Checkbox/Checkbox.svelte";
	import Field from "$lib/components/input/Field/Field.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
</script>

<Flex justifyContent="center" alignItems="center">
	<Field label="Accept the legal policies" name="legal_accept">
		<Checkbox />
	</Field>
</Flex>
