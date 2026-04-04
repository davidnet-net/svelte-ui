<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";

	import Loader from "$lib/components/loading/Spinner/Spinner.svelte";
	import ToolTip from "$lib/components/overlays/ToolTip/ToolTip.svelte";
	import Icon from "$lib/components/primitives/Icon/Icon.svelte";
	import { focusring } from "$lib/styles/global.css";
	import type { iconType } from "$lib/types/Icon.ts";

	import { styles as iconStyles } from "../../primitives/Icon/Icon.css";
	import { styles } from "./IconButton.css";

	interface Props extends HTMLButtonAttributes {
		icon: iconType;
		iconstyle?: keyof typeof iconStyles.iconType;

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

		onclick: (event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => void;
		appearance?: keyof typeof styles.appearance;
		tip: string;
		keyboardTip?: string[];
	}

	let {
		appearance = "subtle",
		loading = false,
		onclick,
		class: className = "",
		type = "button",
		icon,
		selected = false,
		tip,
		iconstyle = "filled",
		disabled = false,
		keyboardTip = [],
		...rest
	}: Props = $props();

	let hovered = $state(false);

	const isDisabled = $derived(disabled || loading);
	const isSelected = $derived(isDisabled ? false : selected);

	const currentState = $derived(
		isDisabled
			? styles.disabledappearance
			: isSelected
				? styles.selectedappearance
				: styles.appearance[appearance]
	);
</script>

<button
	onmouseenter={() => {
		hovered = true;
	}}
	onmouseleave={() => {
		hovered = false;
	}}
	class="{focusring} {styles.baseIconButton} {currentState} {className}"
	{type}
	{onclick}
	disabled={isDisabled}
	aria-label={tip}
	{...rest}>
	{#if loading}
		<Loader size="medium" />
	{:else}
		<Icon {icon} type={iconstyle} />
	{/if}
	{#if hovered && !disabled && tip.length > 0}
		<ToolTip {tip} {keyboardTip} />
	{/if}
</button>
