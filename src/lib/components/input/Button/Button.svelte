<script lang="ts">
	import Icon from "$lib/components/primitives/Icon/Icon.svelte";
	import Loader from "$lib/components/primitives/Loader/Loader.svelte";
	import type { Snippet } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";
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

		/**
		 * Disables the button and display an loader
		 * @default false
		 */
		loading?: boolean;
		appearance?: keyof typeof styles.appearance;
	}

	let {
		children,
		appearance = "subtle",
		iconbefore,
		iconafter,
		stretchwidth,
		loading = false,
		class: className = "",
		type = "button",
		disabled = false,
		...rest
	}: Props = $props();

	const isDisabled = $derived(disabled || loading);
</script>

<button
	class="{styles.baseButton} {stretchwidth ? styles.stretchwidth : ''} {isDisabled
		? styles.disabledappearance
		: styles.appearance[appearance]} {className}"
	{type}
	disabled={isDisabled}
	{...rest}
>
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
