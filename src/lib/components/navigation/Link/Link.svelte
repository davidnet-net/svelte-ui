<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAnchorAttributes } from "svelte/elements";

	import Anchor from "$lib/components/primitives/Anchor/Anchor.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import Icon from "$lib/components/primitives/Icon/Icon.svelte";

	import { styles } from "./Link.css";

	interface Props extends HTMLAnchorAttributes {
		children: Snippet;

		/**
		 * Opens link in new tab.
		 * @default false
		 */
		opennewtab?: boolean;

		/**
		 * Marks the link as external.
		 * @default false
		 */
		external?: boolean;

		/**
		 * Disables the link.
		 * @default false
		 */
		disabled?: boolean;

		/**
		 * @deprecated
		 * @default false
		 */
		UNSAFE_showExitPage?: boolean;
	}

	let {
		children,
		opennewtab = false,
		external = false,
		disabled = false,
		// eslint-disable-next-line @typescript-eslint/no-deprecated
		UNSAFE_showExitPage = false,
		href,
		...rest
	}: Props = $props();
</script>

<Anchor
	{opennewtab}
	{external}
	{disabled}
	{UNSAFE_showExitPage}
	{href}
	class={styles.baseLink}
	{...rest}>
	<Flex alignItems="center" justifyContent="center" verticalAlign="inherit" gap="xsmall">
		{@render children()}
		{#if opennewtab || external}
			<Icon icon="open_in_new" />
		{/if}
	</Flex>
</Anchor>
