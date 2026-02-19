<script lang="ts">
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import Card from "$lib/internal/components/Card/Card.svelte";
	import Header from "$lib/internal/components/Header/Header.svelte";
	import { getCurrentPage } from "$lib/internal/navigationData.svelte.ts";

	import * as m from "../paraglide/messages.js";
	import { styles } from "./page.css.ts";

	const navigationPageData = getCurrentPage();
</script>

<svelte:head>
	<title>{navigationPageData.title}</title>
	<meta name="description" content={navigationPageData.description} />
	<link rel="canonical" href={navigationPageData.fullUrl} />

	<meta property="og:type" content={navigationPageData.ogType} />
	<meta property="og:url" content={navigationPageData.fullUrl} />
	<meta property="og:title" content={navigationPageData.title} />
	<meta property="og:description" content={navigationPageData.description} />
	<meta property="og:image" content={navigationPageData.ogImage} />
</svelte:head>

<Header heading="Davidnet Design System" paragraph={m.page_header_paragraph()} />

<div class={styles.pageContainer}>
	<h2>{m.page_subheading_get_started()}</h2>
	<Flex direction="row" gap="medium" marginTop="medium" marginBottom="medium" overflowX="auto">
		<Card
			href="/foundations"
			title={m.page_card_foundations_title()}
			description={m.page_card_foundations_description()} />
		<Card
			href="/components"
			title={m.page_card_components_title()}
			description={m.page_card_components_description()} />
		<Card href="/tools" title={m.page_card_tools_title()} />
	</Flex>
</div>
