<script lang="ts">
	import { styles } from "./Skeleton.css.ts";

	interface Props {
		width?: string;
		height?: string;
		radius?: keyof typeof styles.radius;
	}

	let { width = "100%", height = "100%", radius = "small" }: Props = $props();
</script>

<div
	style:height
	style:width
	class="{styles.baseSkeleton} {styles.radius[radius]}"
	aria-hidden="true"
>
	<div class={styles.shimmer}></div>
</div>
