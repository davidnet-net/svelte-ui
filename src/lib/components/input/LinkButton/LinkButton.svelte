<script lang="ts">
	import Icon from "$lib/components/primitives/Icon/Icon.svelte";
	import Loader from "$lib/components/loading/Spinner/Spinner.svelte";
	import type { Snippet } from "svelte";
	import type { HTMLAnchorAttributes } from "svelte/elements";
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
	const target = $derived(opennewtab || external ? "_blank" : rest.target);
	const rel = $derived(opennewtab || external ? "noopener noreferrer" : rest.rel);
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a
	class="{styles.baseLinkButton} {stretchwidth ? styles.stretchwidth : ''} {isDisabled
		? styles.disabledappearance
		: styles.appearance[appearance]} {className}"
	href={disabled ? undefined : href}
	{target}
	{rel}
	aria-disabled={disabled}
	{...rest}
>
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
</a>
