<script lang="ts">
	import type { Snippet } from "svelte";

	import { styles } from "./Flex.css.ts";

	interface Props {
		direction?: keyof typeof styles.direction;
		alignItems?: keyof typeof styles.alignItems;
		justifyContent?: keyof typeof styles.justifyContent;
		width?: string;
		height?: string;
		gap?: keyof typeof styles.gap;
		marginTop?: keyof typeof styles.marginTop;
		marginRight?: keyof typeof styles.marginRight;
		marginBottom?: keyof typeof styles.marginBottom;
		marginLeft?: keyof typeof styles.marginLeft;
		children: Snippet;
	}

	let {
		direction = "row",
		alignItems = "start",
		justifyContent = "start",
		width = "100%",
		height = "100%",
		gap = "none",
		marginTop = "none",
		marginRight = "none",
		marginBottom = "none",
		marginLeft = "none",
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
        {styles.marginTop[marginTop]}
        {styles.marginRight[marginRight]}
        {styles.marginBottom[marginBottom]}
        {styles.marginLeft[marginLeft]}
    "
	style:width
	style:height>
	{@render children()}
</div>
