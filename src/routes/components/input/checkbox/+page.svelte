<script lang="ts">
	import Checkbox from "$lib/components/input/Checkbox/Checkbox.svelte";
	import Field from "$lib/components/input/Field/Field.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import Header from "$lib/internal/components/Header/Header.svelte";
	import * as m from "$lib/paraglide/messages.js";
</script>

<Header heading={m.docs_page_name_checkbox()} paragraph={m.docs_page_components_card_checkbox_description()} />

<Flex justifyContent="center" alignItems="center">
	<Field label={m.docs_page_checkbox_field_label()} name="legal_accept">
		<Checkbox />
	</Field>
</Flex>
