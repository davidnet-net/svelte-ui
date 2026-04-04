<script lang="ts">
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import Card from "$lib/internal/components/Card/Card.svelte";
	import Header from "$lib/internal/components/Header/Header.svelte";
	import NavigationData from "$lib/internal/components/NavigationData.svelte";
	import * as m from "$lib/paraglide/messages.js";

	import { styles } from "./page.css";
</script>

<NavigationData />

<Header heading="Davidnet Design System" paragraph={m.docs_page_header_paragraph()} />

<div class={styles.pageContainer}>
	<h2>{m.docs_page_subheading_get_started()}</h2>
	<Flex direction="row" gap="medium" marginTop="medium" marginBottom="medium" overflowX="auto">
		<Card
			href="/foundations"
			title={m.docs_page_card_foundations_title()}
			description={m.docs_page_card_foundations_description()} />
		<Card
			href="/components"
			title={m.docs_page_card_components_title()}
			description={m.docs_page_card_components_description()} />
		<Card href="/tools" title={m.docs_page_card_tools_title()} />
	</Flex>
</div>
