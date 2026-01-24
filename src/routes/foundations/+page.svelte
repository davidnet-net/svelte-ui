<script lang="ts">
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import Card from "$lib/internal/components/Card/Card.svelte";
	import Header from "$lib/internal/components/Header/Header.svelte";

	import * as m from "../../paraglide/messages.js";
	import { styles } from "./page.css.ts";
</script>

<Header
	heading={m.page_foundations_header_heading()}
	paragraph={m.page_foundations_header_paragraph()} />

<div class={styles.pageContainer}>
	<h2>{m.page_foundations_subheading_design_tokens()}</h2>
	<Flex direction="row" gap="medium" marginTop="medium" marginBottom="medium">
		<Card
			href="/foundations/design_tokens"
			title={m.page_foundations_card_design_tokens_title()}
			description={m.page_foundations_card_design_tokens_description()} />
	</Flex>

	<h2>{m.page_foundations_subheading_content_guidelines()}</h2>
	<Flex direction="row" gap="medium" marginTop="medium" marginBottom="medium">
		{m.common_coming_soon()}
	</Flex>

	<h2>{m.page_foundations_subheading_styling_guidelines()}</h2>
	<Flex direction="row" gap="medium" marginTop="medium" marginBottom="medium">
		{m.common_coming_soon()}
	</Flex>
</div>
