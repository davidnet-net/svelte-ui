<script lang="ts">
	import { styles } from "./Loader.css.ts";

	interface Props {
		size?: keyof typeof styles.size;
	}

	let { size = "medium" }: Props = $props();
</script>

<span class="{styles.baseLoader} {styles.size[size]}"></span>
