<script lang="ts">
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import Card from "$lib/internal/components/Card/Card.svelte";
	import Header from "$lib/internal/components/Header/Header.svelte";
	import NavigationData from "$lib/internal/components/NavigationData.svelte";
	import * as m from "$lib/paraglide/messages.js";

	import { styles } from "./page.css";
</script>

<NavigationData />

<Header heading="Tools" paragraph="Utilities and resources for working with the design system." />

<div class={styles.pageContainer}>
	<h2>General purpose</h2>
	<Flex direction="row" gap="medium" marginTop="medium" marginBottom="medium">
		<Card
			href="/tools/llm-resources"
			title="LLM Resources"
			description="Let AI write code that fits with our system design." />
		<Card href="/tools/simulation" title="Simulation" description="Test components in isolation." />
	</Flex>
	<h2>Design</h2>
	<Flex direction="row" gap="medium" marginTop="medium" marginBottom="medium">
		<Card
			href="/foundations/design-tokens/library"
			title={m.docs_page_design_tokens_card_design_token_library_title()}
			description={m.docs_page_design_tokens_card_design_token_library_description()} />
	</Flex>
</div>
