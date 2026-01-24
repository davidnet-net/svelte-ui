<script lang="ts">
	import type { Snippet } from "svelte";

	import { styles } from "./Blanket.css.ts";

	interface Props {
		children: Snippet;
		onclick?: (event?: MouseEvent) => void;

		centerContent?: boolean;
	}

	let { children, onclick, centerContent = true }: Props = $props();

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Escape" && onclick) {
			onclick();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div
	class="{styles.baseBlanket} {centerContent ? styles.centered : styles.notCentered}"
	{onclick}
	role="presentation">
	<div role="none" onclick={(e) => e.stopPropagation()}>
		{@render children()}
	</div>
</div>
