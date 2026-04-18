<script lang="ts">
	import type { Snippet } from "svelte";

	import * as styles from "./Flex.css";

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
		verticalAlign?: keyof typeof styles.verticalAlign;
		children: Snippet;
		overflowX?: keyof typeof styles.overflowX;
		overflowY?: keyof typeof styles.overflowY;
		text?: keyof typeof styles.text;
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
		overflowX = "visible",
		verticalAlign = "inherit",
		overflowY = "visible",
		text = "inherit",
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
		{styles.overflowX[overflowX]}
        {styles.overflowY[overflowY]}
		{styles.text[text]}
		{styles.verticalAlign[verticalAlign]}
    "
	style:width
	style:height>
	{@render children()}
</div>
