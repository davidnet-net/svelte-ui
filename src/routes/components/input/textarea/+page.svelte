<script>
	import Field from "$lib/components/input/Field/Field.svelte";
	import Form from "$lib/components/input/Form/Form.svelte";
	import TextArea from "$lib/components/input/TextArea/TextArea.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
</script>

<Flex justifyContent="center" alignItems="center">
	<Form>
		<Field label="Your opinion:" name="opinion" required>
			<TextArea maxlength={200} />
		</Field>
	</Form>
</Flex>
