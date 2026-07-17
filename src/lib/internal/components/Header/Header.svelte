<script lang="ts">
	import type { Snippet } from "svelte";

	import Flex from "$lib/components/primitives/Flex/Flex.svelte";

	import { styles } from "./Header.css";

	interface Props {
		heading: string;
		paragraph: string;
		tabs?: Snippet;
	}

	let { heading, paragraph, tabs }: Props = $props();
</script>

<div class={styles.baseHeader}>
	<div class={styles.topContent}>
		<Flex justifyContent="center" direction="column">
			<h1 class={styles.header}>{heading}</h1>
			<p style="max-width: 22rem">{paragraph}</p>
		</Flex>
	</div>

	{#if tabs}
		<div class={styles.tabsWrapper}>
			<Flex direction="row" gap="small">
				{@render tabs()}
			</Flex>
		</div>
	{/if}
</div>
