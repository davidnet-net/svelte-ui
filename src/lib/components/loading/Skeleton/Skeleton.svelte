<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import VisuallyHidden from "$lib/components/messaging/VisuallyHidden/VisuallyHidden.svelte";

	import { styles } from "./Skeleton.css";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		width?: string;
		height?: string;
		radius?: keyof typeof styles.radius;
		noDefaults?: boolean;
	}

	let {
		noDefaults = false,
		width = "100%",
		height = "100%",
		radius = "small",
		class: className,
		...rest
	}: Props = $props();
</script>

<div
	style:height={noDefaults ? undefined : height}
	style:width={noDefaults ? undefined : width}
	class="{styles.baseSkeleton} {noDefaults ? '' : styles.radius[radius]} {className ?? ''}"
	aria-hidden="true"
	{...rest}>
	<div class={styles.shimmer}></div>
	<VisuallyHidden>Loading</VisuallyHidden>
</div>
