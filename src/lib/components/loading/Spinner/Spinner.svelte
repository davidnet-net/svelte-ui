<script lang="ts">
	import { libaryStrings } from "$lib/engines/translationEngine.svelte.ts";

	import { styles } from "./Spinner.css.ts";

	interface Props {
		size?: keyof typeof styles.size;
	}

	let { size = "medium" }: Props = $props();
</script>

<span class="{styles.baseLoader} {styles.size[size]}" aria-label={libaryStrings.loading_spinner}>
</span>
