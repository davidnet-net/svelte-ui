<script lang="ts">
	import { styles } from "./Banner.css.ts";
	import type { Snippet } from "svelte";

	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import Icon from "$lib/components/primitives/Icon/Icon.svelte";
	import type { iconType } from "../../../types/Icon.ts";

	interface Props {
		appearance: keyof typeof styles.appearance;
		children: Snippet;
		icon?: iconType;
	}
	let { appearance, children, icon }: Props = $props();
</script>

<div class="{styles.baseBanner} {styles.appearance[appearance]}">
	<Flex width="100%" height="3rem" direction="row" alignItems="center" gap="small">
		{#if icon}
			<Icon {icon} size="large" />
		{/if}
		<span class={styles.message}>
			{@render children()}
		</span>
	</Flex>
</div>
