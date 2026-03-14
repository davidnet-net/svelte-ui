<script lang="ts">
	import { m as library_messages } from "$lib/paraglide/messages.js";

	import { styles } from "./Spinner.css.ts";

	interface Props {
		size?: keyof typeof styles.size;
	}

	let { size = "medium" }: Props = $props();
</script>

<span
	class="{styles.baseLoader} {styles.size[size]}"
	aria-label={library_messages.lib_component_spinner_alt()}>
</span>
