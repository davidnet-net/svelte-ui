<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	import VisuallyHidden from "$lib/components/messaging/VisuallyHidden/VisuallyHidden.svelte";
	import { m as library_messages } from "$lib/paraglide/messages.js";

	import { styles } from "./Skeleton.css";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		width?: string;
		height?: string;
		radius?: keyof typeof styles.radius;
		noDefaults?: boolean;
		children?: Snippet | undefined;
	}

	let {
		noDefaults = false,
		width = "100%",
		height = "100%",
		radius = "small",
		children = undefined,
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
	<div class={styles.shimmer}>
		{#if children}
			{@render children()}
		{/if}
	</div>
	<VisuallyHidden>{library_messages.lib_common_loading()}</VisuallyHidden>
</div>
