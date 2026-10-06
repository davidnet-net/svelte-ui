<script lang="ts">
	import Field from "$lib/components/input/Field/Field.svelte";
	import TextField from "$lib/components/input/TextField/TextField.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import Header from "$lib/internal/components/Header/Header.svelte";
	import * as m from "$lib/paraglide/messages.js";
</script>

<Header heading={m.docs_page_name_textfield()} paragraph={m.docs_page_components_card_textfield_description()} />

<Flex alignItems="center" justifyContent="center" height="100%">
	<Flex width="300px" height="fit-content">
		<Field required label={m.docs_page_textfield_field_label()} name="password" invalid={undefined}>
			<TextField placeholder={m.docs_page_textfield_placeholder()} type="password" disabled={false} />
		</Field>
	</Flex>
</Flex>
