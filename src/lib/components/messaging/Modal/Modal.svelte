<script lang="ts">
	import type { Snippet } from "svelte";

	import IconButton from "$lib/components/input/IconButton/IconButton.svelte";
	import Blanket from "$lib/components/overlays/Blanket/Blanket.svelte";
	import { appState } from "$lib/engines/appStateEngine.svelte";
	import { libaryStrings } from "$lib/engines/translationEngine.svelte";

	import { styles } from "./Modal.css";

	interface Props {
		title: string;
		children: Snippet;
		actions: Snippet;
		onclose?: VoidFunction;
	}

	let { title, children, actions, onclose }: Props = $props();
</script>

<Blanket onclick={onclose}>
	<div class="{styles.baseModal} {appState.isTinyMobile ? styles.tinyScreen : styles.normalScreen}">
		<div class={styles.header}>
			<h2 class={styles.title}>{title}</h2>
			{#if onclose}
				<IconButton icon="close" tip={libaryStrings.modal_close_modal} onclick={onclose} />
			{/if}
		</div>
		<div class={styles.content}>
			{@render children()}
		</div>
		<div class={styles.actions}>
			{@render actions()}
		</div>
	</div>
</Blanket>
