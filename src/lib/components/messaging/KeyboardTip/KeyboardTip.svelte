<script lang="ts">
	import { styles } from "./KeyboardTip.css.ts";

	interface Props {
		keyboardTip: string[];
	}

	let { keyboardTip = [] }: Props = $props();
</script>

<div class={styles.baseShortcut}>
	{#each keyboardTip as key, i (i)}
		<kbd class={styles.key}>{key}</kbd>
		{#if i < keyboardTip.length - 1}
			<span>+</span>
		{/if}
	{/each}
</div>
