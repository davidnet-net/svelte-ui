<script lang="ts">
	import type { Snippet } from "svelte";

	import { styles } from "./Blanket.css";

	interface Props {
		children: Snippet;
		onclick?: (event?: MouseEvent) => void;

		centerContent?: boolean;
	}

	let { children, onclick, centerContent = true }: Props = $props();
</script>

<div
	class="{styles.baseBlanket} {centerContent ? styles.centered : styles.notCentered}"
	{onclick}
	role="presentation">
	<div role="none" onclick={(e) => e.stopPropagation()}>
		{@render children()}
	</div>
</div>
