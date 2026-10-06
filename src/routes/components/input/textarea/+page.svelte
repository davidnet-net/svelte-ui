<script lang="ts">
	import Field from "$lib/components/input/Field/Field.svelte";
	import Form from "$lib/components/input/Form/Form.svelte";
	import TextArea from "$lib/components/input/TextArea/TextArea.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import Header from "$lib/internal/components/Header/Header.svelte";
	import * as m from "$lib/paraglide/messages.js";
</script>

<Header heading={m.docs_page_name_textarea()} paragraph={m.docs_page_components_card_textarea_description()} />

<Flex justifyContent="center" alignItems="center">
	<Form>
		<Field label={m.docs_page_textarea_field_label()} name="opinion" required>
			<TextArea maxlength={200} />
		</Field>
	</Form>
</Flex>
