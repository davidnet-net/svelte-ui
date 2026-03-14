<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";

	import Loader from "$lib/components/loading/Spinner/Spinner.svelte";
	import Icon from "$lib/components/primitives/Icon/Icon.svelte";

	import { focusring } from "../../../styles/global.css.ts";
	import type { iconType } from "../../../types/Icon.ts";
	import { styles } from "./Button.css.ts";

	interface Props extends HTMLButtonAttributes {
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

		alignContent?: keyof typeof styles.alignContent;

		/**
		 * Disables the button and display an loader
		 * @default false
		 */
		loading?: boolean;

		/**
		 * Lets the button look selected
		 * @default false
		 */
		selected?: boolean;

		onclick?: (event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => void;
		appearance?: keyof typeof styles.appearance;
	}

	let {
		children,
		appearance = "default",
		iconbefore,
		iconafter,
		stretchwidth,
		alignContent = "center",
		loading = false,
		selected = false,
		onclick,
		class: className = "",
		type = "button",
		disabled = false,
		...rest
	}: Props = $props();

	const isDisabled = $derived(disabled || loading);
	const isSelected = $derived(isDisabled ? false : selected);

	const state = $derived(
		isDisabled
			? styles.disabledappearance
			: isSelected
				? styles.selectedappearance
				: styles.appearance[appearance]
	);
</script>

<button
	class="{focusring} {styles.alignContent[alignContent]} {styles.baseButton} {stretchwidth
		? styles.stretchwidth
		: ''} {state} {className}"
	{type}
	{onclick}
	disabled={isDisabled}
	{...rest}>
	{#if loading}
		<Loader size="medium" />
	{:else}
		{#if iconbefore}
			<Icon icon={iconbefore} />
		{/if}
		{@render children()}
		{#if iconafter}
			<Icon icon={iconafter} />
		{/if}
	{/if}
</button>
