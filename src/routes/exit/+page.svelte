<script lang="ts">
	import { page } from "$app/state";
	import Button from "$lib/components/input/Button/Button.svelte";
	import LinkButton from "$lib/components/input/LinkButton/LinkButton.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import { appState } from "$lib/engines/appStateEngine.svelte";
	import * as m from "$lib/paraglide/messages.js";

	import { styles } from "./page.css";

	appState.hideNavigation = true;

	const href = $derived(page.url.searchParams.get("href") || null);
	$effect(() => {
		if (!href) {
			window.close();
			const timeout = setTimeout(() => {
				window.location.href = "about:blank";
			}, 100);
			return () => clearTimeout(timeout);
		}
	});
</script>

{#if href}
	<Flex justifyContent="center" alignItems="center" direction="column" gap="small">
		<h1 class={styles.heading}>{m.docs_page_exit_heading()}</h1>
		<p class={styles.paragraph}>
			{m.docs_page_exit_paragraph_1()}
			<br />
			{m.docs_page_exit_paragraph_2()}
		</p>
		<br />
		<p class={styles.paragraph}>
			{m.docs_page_exit_destination({ href })}
		</p>
		<br />
		<Flex
			height="fit-content"
			width="fit-content"
			alignItems="center"
			justifyContent="center"
			gap="small">
			<Button
				onclick={() => {
					window.close();
				}}>
				{m.docs_page_exit_cancel()}
			</Button>
			<LinkButton rel="noopener noreferrer" appearance="primary" {href}>
				{m.docs_page_exit_continue()}
			</LinkButton>
		</Flex>
	</Flex>
{/if}
