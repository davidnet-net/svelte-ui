<script>
	import { getContext } from "svelte";

	import Button from "$lib/components/input/Button/Button.svelte";

	let { value, children } = $props();
	const tabs = getContext("tabs");

	let isActive = $derived(tabs.selected === value);

	import * as styles from "./Tab.css";
</script>

<Button
	role="tab"
	appearance="subtle"
	selected={isActive}
	class={styles.underline}
	onclick={() => (tabs.selected = value)}>
	{@render children()}
</Button>
