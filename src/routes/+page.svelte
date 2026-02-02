<script lang="ts">
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import Card from "$lib/internal/components/Card/Card.svelte";
	import Header from "$lib/internal/components/Header/Header.svelte";

	import * as m from "../paraglide/messages.js";
	import { styles } from "./page.css.ts";
</script>

<Header heading="Davidnet Design System" paragraph={m.page_header_paragraph()} />

<div class={styles.pageContainer}>
	<h2>{m.page_subheading_get_started()}</h2>
	<Flex direction="row" gap="medium" marginTop="medium" marginBottom="medium" overflowX="auto">
		<Card
			href="/foundations"
			title={m.page_card_foundations_title()}
			description={m.page_card_foundations_description()} />
		<Card
			href="#"
			title={m.page_card_components_title()}
			description={m.page_card_components_description()} />
		<Card href="#" title={m.page_card_tools_title()} />
	</Flex>
</div>
