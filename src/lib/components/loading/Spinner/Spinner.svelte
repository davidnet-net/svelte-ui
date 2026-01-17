<script lang="ts">
	import { styles } from "./Spinner.css.ts";

	interface Props {
		size?: keyof typeof styles.size;
	}

	let { size = "medium" }: Props = $props();
</script>

<span class="{styles.baseLoader} {styles.size[size]}" aria-label="Loading spinner"></span>
