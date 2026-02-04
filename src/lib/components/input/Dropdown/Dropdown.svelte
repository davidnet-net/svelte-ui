<script lang="ts">
	import type { Snippet } from "svelte";

	import { styles } from "./Dropdown.css";
	interface Props {
		children: Snippet;
		trigger: Snippet;
		isOpen?: boolean;
	}

	let { children, trigger, isOpen = false }: Props = $props();
</script>

<div class={styles.baseDropdown}>
	{@render trigger()}

	{#if isOpen}
		<div class={styles.dropdownContent}>
			{@render children()}
		</div>
	{/if}
</div>
