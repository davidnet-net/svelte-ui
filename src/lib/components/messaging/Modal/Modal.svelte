<script lang="ts">
	import type { Snippet } from "svelte";

	import IconButton from "$lib/components/input/IconButton/IconButton.svelte";
	import Blanket from "$lib/components/overlays/Blanket/Blanket.svelte";
	import { appState } from "$lib/engines/appStateEngine.svelte";
	import { focusTrap } from "$lib/engines/focusEngine.svelte";
	import { shortcutTrap } from "$lib/engines/shortcutEngine.svelte";
	import { libaryStrings } from "$lib/engines/translationEngine.svelte";
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

	//TODO: Add back button of mobile to close modal
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
				<IconButton icon="close" tip={libaryStrings.modal_close_modal} onclick={onclose} />
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
