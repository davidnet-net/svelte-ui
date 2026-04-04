<script lang="ts">
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import Card from "$lib/internal/components/Card/Card.svelte";
	import Header from "$lib/internal/components/Header/Header.svelte";
	import NavigationData from "$lib/internal/components/NavigationData.svelte";
	import * as m from "$lib/paraglide/messages.js";

	import { styles } from "./page.css";
</script>

<NavigationData />

<Header
	heading={m.docs_page_foundations_header_heading()}
	paragraph={m.docs_page_foundations_header_paragraph()} />

<div class={styles.pageContainer}>
	<h2>{m.docs_page_foundations_subheading_design_tokens()}</h2>
	<Flex direction="row" gap="medium" marginTop="medium" marginBottom="medium">
		<Card
			href="/foundations/design-tokens"
			title={m.docs_page_foundations_card_design_tokens_title()}
			description={m.docs_page_foundations_card_design_tokens_description()} />
	</Flex>

	<h2>{m.docs_page_foundations_subheading_content_guidelines()}</h2>
	<Flex direction="row" gap="medium" marginTop="medium" marginBottom="medium">
		{m.docs_common_coming_soon()}
	</Flex>

	<h2>{m.docs_page_foundations_subheading_styling_guidelines()}</h2>
	<Flex direction="row" gap="medium" marginTop="medium" marginBottom="medium">
		{m.docs_common_coming_soon()}
	</Flex>
</div>
