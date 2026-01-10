<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";

	import Loader from "$lib/components/loading/Spinner/Spinner.svelte";
	import ToolTip from "$lib/components/overlays/ToolTip/ToolTip.svelte";
	import Icon from "$lib/components/primitives/Icon/Icon.svelte";

	import { focusring } from "../../../styles/global.css.ts";
	import type { iconType } from "../../../types/Icon.ts";
	import { styles } from "./IconButton.css.ts";

	interface Props extends HTMLButtonAttributes {
		icon: iconType;

		/**
		 * Disables the button and display an loader
		 * @default false
		 */
		loading?: boolean;
		onclick: (event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => void;
		appearance?: keyof typeof styles.appearance;
		tip: string;
	}

	let {
		appearance = "subtle",
		loading = false,
		onclick,
		class: className = "",
		type = "button",
		icon,
		tip,
		disabled = false,
		...rest
	}: Props = $props();

	const isDisabled = $derived(disabled || loading);
	let hovered = $state(false);
</script>

<button
	onmouseenter={() => {
		hovered = true;
	}}
	onmouseleave={() => {
		hovered = false;
	}}
	class="{focusring} {styles.baseIconButton} {isDisabled
		? styles.disabledappearance
		: styles.appearance[appearance]} {className}"
	{type}
	{onclick}
	disabled={isDisabled}
	{...rest}
>
	{#if loading}
		<Loader size="medium" />
	{:else}
		<Icon {icon} />
	{/if}
	{#if hovered && !disabled}
		<ToolTip {tip} />
	{/if}
</button>
