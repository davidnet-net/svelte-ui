<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAnchorAttributes } from "svelte/elements";

	import Loader from "$lib/components/loading/Spinner/Spinner.svelte";
	import Anchor from "$lib/components/primitives/Anchor/Anchor.svelte";
	import Icon from "$lib/components/primitives/Icon/Icon.svelte";

	import { focusring } from "../../../styles/global.css.ts";
	import type { iconType } from "../../../types/Icon.ts";
	import { styles } from "./LinkButton.css.ts";

	interface Props extends HTMLAnchorAttributes {
		children: Snippet;

		/**
		 * Name icon before content
		 */
		iconbefore?: iconType;

		/**
		 * Name icon after content
		 */
		iconafter?: iconType;

		/**
		 * Expands button width to 100%
		 * @default false
		 */
		stretchwidth?: boolean;

		/**
		 * Disables the button and display an loader
		 * @default false
		 */
		loading?: boolean;

		/**
		 * Adds an opennewtabicon if no icon is set on the right.
		 * Opens link in new tab.
		 * @default false
		 */
		opennewtab?: boolean;
		external?: boolean;
		disabled?: boolean;
		href: string;
		appearance?: keyof typeof styles.appearance;
	}

	let {
		children,
		appearance = "subtle",
		iconbefore,
		iconafter,
		stretchwidth,
		loading = false,
		opennewtab = false,
		external = false,
		class: className = "",
		href,
		disabled = false,
		...rest
	}: Props = $props();

	const isDisabled = $derived(disabled || loading);
	const iconAfter = $derived(iconafter ? iconafter : opennewtab ? "open_in_new" : "");
</script>

<Anchor
	class="{focusring} {styles.baseLinkButton} {stretchwidth ? styles.stretchwidth : ''} {isDisabled
		? styles.disabledappearance
		: styles.appearance[appearance]} {className}"
	{href}
	{disabled}
	{opennewtab}
	{external}
	{...rest}>
	{#if loading}
		<Loader size="medium" />
	{:else}
		{#if iconbefore}
			<Icon icon={iconbefore} />
		{/if}
		{@render children()}
		{#if iconAfter}
			<Icon icon={iconAfter} />
		{/if}
	{/if}
</Anchor>
