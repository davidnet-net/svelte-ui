<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAnchorAttributes } from "svelte/elements";

	import Anchor from "$lib/components/primitives/Anchor/Anchor.svelte";

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
		 * @default false
		 */
		UNSAFE_showExitPage?: boolean;
	}

	let {
		children,
		opennewtab = false,
		external = false,
		disabled = false,
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
	{@render children()}
</Anchor>
