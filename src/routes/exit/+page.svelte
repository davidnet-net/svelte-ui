<script lang="ts">
	import { page } from "$app/state";
	import Button from "$lib/components/input/Button/Button.svelte";
	import LinkButton from "$lib/components/input/LinkButton/LinkButton.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import { appState } from "$lib/engines/appStateEngine.svelte";

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
		<h1 class={styles.heading}>You are now leaving Davidnet</h1>
		<p class={styles.paragraph}>
			This link is taking you to an website that is not controlled or operated by us. <br />
			We are not responsible for the content or availability of external sites.
		</p>
		<br />
		<p class={styles.paragraph}>
			You are going to <b>{href}</b>
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
				Cancel
			</Button>
			<LinkButton rel="noopener noreferrer" appearance="primary" {href}>Continue</LinkButton>
		</Flex>
	</Flex>
{/if}
