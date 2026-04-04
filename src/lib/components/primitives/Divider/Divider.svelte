<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { styles } from "./Divider.css";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		thickness?: keyof typeof styles.thickness;
		color?: keyof typeof styles.color;
	}

	let { thickness = "standard", color = "default", class: className, ...rest }: Props = $props();
</script>

<div
	{...rest}
	class="{styles.baseDivider} {styles.thickness[thickness]} {styles.color[color]} {className ??
		''}">
</div>
