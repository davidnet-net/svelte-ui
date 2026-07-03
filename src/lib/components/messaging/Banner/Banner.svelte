<script lang="ts">
	import type { Snippet } from "svelte";
	import { quintOut } from "svelte/easing";
	import { slide } from "svelte/transition";

	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import Icon from "$lib/components/primitives/Icon/Icon.svelte";
	import { icons } from "$lib/styles/icons.css";
	import type { iconType } from "$lib/types/Icon";

	import { styles } from "./Banner.css";

	interface Props {
		appearance: keyof typeof styles.appearance;
		children: Snippet;
		icon?: iconType;
		iconVariant?: keyof typeof icons;
	}
	let { appearance, children, icon, iconVariant = "filled" }: Props = $props();
</script>

<div
	class="{styles.baseBanner} {styles.appearance[appearance]}"
	transition:slide={{ duration: 500, easing: quintOut }}
	role={appearance === "danger" ? "alert" : "status"}
	aria-live={appearance === "danger" ? "assertive" : "polite"}>
	<Flex width="100%" height="3rem" direction="row" alignItems="center" gap="small">
		{#if icon}
			<Icon {icon} type={iconVariant} size="large" />
		{/if}
		<span class={styles.message}>
			{@render children()}
		</span>
	</Flex>
</div>
