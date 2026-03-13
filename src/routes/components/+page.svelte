<script lang="ts">
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import Card from "$lib/internal/components/Card/Card.svelte";
	import Header from "$lib/internal/components/Header/Header.svelte";

	import * as m from "../../paraglide/messages.js";
	import { styles } from "./page.css.ts";
</script>

<Header
	heading={m.page_components_header_heading()}
	paragraph={m.page_components_header_paragraph()} />

<div class={styles.pageContainer}>
	<h2>{m.page_components_subheading_primitives()}</h2>
	<Flex direction="row" gap="medium" marginTop="medium" marginBottom="medium" overflowX="auto">
		<Card
			href="/components/primitives/anchor"
			title="Anchor"
			description={m.page_components_card_anchor_description()} />
		<Card
			href="/components/primitives/appshell"
			title="AppShell"
			description={m.page_components_card_appshell_description()} />
		<Card
			href="/components/primitives/avatar"
			title="Avatar"
			description={m.page_components_card_avatar_description()} />
		<Card
			href="/components/primitives/divider"
			title="Divider"
			description={m.page_components_card_divider_description()} />
		<Card
			href="/components/primitives/flex"
			title="Flex"
			description={m.page_components_card_flex_description()} />
		<Card
			href="/components/primitives/icon"
			title="Icon"
			description={m.page_components_card_icon_description()} />
	</Flex>
</div>
