<script lang="ts">
	import type { Snippet } from "svelte";
	import { buttonRecipe, type ButtonVariants } from "./Button.css.ts";

	// Props
	interface Props {
		children: Snippet;
		onclick?: () => void;
	}
	let { children, kind = "primary", size = "medium", onclick }: Props & ButtonVariants = $props();
</script>

<button class={buttonRecipe({ kind, size })} {onclick}>
	{@render children()}
</button>
