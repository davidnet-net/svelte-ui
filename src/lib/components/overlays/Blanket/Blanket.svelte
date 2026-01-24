<script lang="ts">
	import type { Snippet } from "svelte";

	import { useShortcut } from "../../../engines/shortcutEngine.svelte.ts";
	import { styles } from "./Blanket.css.ts";

	interface Props {
		children: Snippet;
		onclick?: (event?: MouseEvent) => void;

		centerContent?: boolean;
	}

	let { children, onclick, centerContent = true }: Props = $props();

	useShortcut("escape", () => onclick?.(), {
		name: "Close overlay",
		description: "",
		preventDefault: true
	});
</script>

<svelte:window onkeydown={() => onclick?.()} />

<div
	class="{styles.baseBlanket} {centerContent ? styles.centered : styles.notCentered}"
	{onclick}
	role="presentation">
	<div role="none" onclick={(e) => e.stopPropagation()}>
		{@render children()}
	</div>
</div>
