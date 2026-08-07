<script lang="ts">
	import type { Snippet } from "svelte";

	import * as styles from "./Lozenge.css";

	interface Props {
		children: Snippet;
		appearance?: keyof typeof styles.appearance;
	}

	let { children, appearance = "default" }: Props = $props();
</script>

<span class={[styles.appearance[appearance], styles.baseStyle]}>
	{@render children()}
</span>
