<script lang="ts">
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";

	import { styles } from "./Header.css";

	interface Props {
		heading: string;
		paragraph: string;
	}

	let { heading, paragraph }: Props = $props();
</script>

<div class={styles.baseHeader}>
	<Flex justifyContent="center" direction="column">
		<h1 class={styles.header}>{heading}</h1>
		<p style="max-width: 22rem">{paragraph}</p>
	</Flex>
	<!--TODO Illustration -->
</div>
