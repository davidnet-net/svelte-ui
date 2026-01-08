<script lang="ts">
	import { styles } from "./Flex.css.ts";
	import type { Snippet } from "svelte";

	interface Props {
		direction?: keyof typeof styles.direction;
		alignItems?: keyof typeof styles.alignItems;
		justifyContent?: keyof typeof styles.justifyContent;
		width?: string;
		height?: string;
		gap?: keyof typeof styles.gap;
		children: Snippet;
	}

	let {
		direction = "row",
		alignItems = "start",
		justifyContent = "start",
		width = "100%",
		height = "100%",
		gap = "none",
		children
	}: Props = $props();
</script>

<div
	class="
        {styles.baseFlex} 
        {styles.direction[direction]} 
        {styles.alignItems[alignItems]} 
        {styles.justifyContent[justifyContent]}
        {styles.gap[gap]}
    "
	style:width
	style:height
>
	{@render children()}
</div>
