<script lang="ts">
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import Card from "$lib/internal/components/Card/Card.svelte";
	import Header from "$lib/internal/components/Header/Header.svelte";
	import NavigationData from "$lib/internal/components/NavigationData.svelte";
	import * as m from "$lib/paraglide/messages.js";

	import { styles } from "./page.css";
</script>

<NavigationData />

<Header heading={m.docs_page_card_tools_title()} paragraph={m.docs_page_card_tools_description()} />

<div class={styles.pageContainer}>
	<h2>{m.docs_page_tools_subheading_general_purpose()}</h2>
	<Flex direction="row" gap="medium" marginTop="medium" marginBottom="medium">
		<Card
			href="/tools/llm-resources"
			title={m.docs_page_tools_card_llm_resources_title()}
			description={m.docs_page_tools_card_llm_resources_description()} />
		<Card
			href="/tools/simulation"
			title={m.docs_page_tools_card_simulation_title()}
			description={m.docs_page_tools_card_simulation_description()} />
	</Flex>
	<h2>{m.docs_page_tools_subheading_design()}</h2>
	<Flex direction="row" gap="medium" marginTop="medium" marginBottom="medium">
		<Card
			href="/foundations/design-tokens/library"
			title={m.docs_page_design_tokens_card_design_token_library_title()}
			description={m.docs_page_design_tokens_card_design_token_library_description()} />
	</Flex>
</div>
