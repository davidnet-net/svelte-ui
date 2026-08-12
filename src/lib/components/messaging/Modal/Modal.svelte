<script lang="ts">
	import { onMount } from "svelte";
	import type { Snippet } from "svelte";

	import IconButton from "$lib/components/input/IconButton/IconButton.svelte";
	import Blanket from "$lib/components/overlays/Blanket/Blanket.svelte";
	import { appState } from "$lib/engines/appStateEngine.svelte";
	import { focusTrap } from "$lib/engines/focusEngine.svelte";
	import { shortcutTrap, useShortcut } from "$lib/engines/shortcutEngine.svelte";
	import { m as library_messages } from "$lib/paraglide/messages.js";
	import { generateUUIDv7 } from "$lib/utils/crypto";

	import { styles } from "./Modal.css";

	interface Props {
		title: string;
		children: Snippet;
		actions: Snippet;
		onclose?: VoidFunction;
	}

	let { title, children, actions, onclose }: Props = $props();

	const screenClass = $derived.by(() => {
		if (appState.isTinyMobile) return styles.tinyScreen;
		if (appState.isMobile) return styles.mobileScreen;
		return styles.normalScreen;
	});

	const titleID = generateUUIDv7();
	const contentID = generateUUIDv7();

	// Close with Escape key
	useShortcut(
		"escape",
		() => {
			if (onclose) onclose();
		},
		{
			active: () => !!onclose,
			name: "Close Modal"
		}
	);

	// Close with mobile back button
	onMount(() => {
		if (!onclose) return;

		// Push a dummy history state so the back button triggers popstate instead of leaving the page
		history.pushState({ modalOpen: true }, "");

		const handlePopState = () => {
			onclose();
		};

		window.addEventListener("popstate", handlePopState);

		return () => {
			window.removeEventListener("popstate", handlePopState);
			// If the modal is closed via code/buttons rather than the back button,
			// clean up the history entry we pushed.
			if (history.state?.modalOpen) {
				history.back();
			}
		};
	});
</script>

<Blanket onclick={onclose}>
	<div
		class="{styles.baseModal} {screenClass}"
		use:focusTrap={true}
		use:shortcutTrap
		role="dialog"
		aria-modal="true"
		aria-labelledby={titleID}
		aria-describedby={contentID}>
		<div class={styles.header}>
			<h2 class={styles.title} id={titleID}>{title}</h2>
			{#if onclose}
				<IconButton
					icon="close"
					tip={library_messages.lib_component_modal_close_alt()}
					onclick={onclose} />
			{/if}
		</div>
		<div class={styles.content} id={contentID} tabindex="-1">
			{@render children()}
		</div>
		<div class={styles.actions}>
			{@render actions()}
		</div>
	</div>
</Blanket>
