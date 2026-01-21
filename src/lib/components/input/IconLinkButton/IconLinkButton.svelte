<script lang="ts">
	import type { HTMLAnchorAttributes } from "svelte/elements";

	import Loader from "$lib/components/loading/Spinner/Spinner.svelte";
	import ToolTip from "$lib/components/overlays/ToolTip/ToolTip.svelte";
	import Anchor from "$lib/components/primitives/Anchor/Anchor.svelte";
	import Icon from "$lib/components/primitives/Icon/Icon.svelte";

	import { focusring } from "../../../styles/global.css.ts";
	import type { iconType } from "../../../types/Icon.ts";
	import { styles } from "./IconLinkButton.css.ts";

	interface Props extends HTMLAnchorAttributes {
		icon: iconType;

		/**
		 * Disables the button and display an loader
		 * @default false
		 */
		loading?: boolean;

		/**
		 * Opens link in new tab.
		 * @default false
		 */
		opennewtab?: boolean;
		external?: boolean;
		disabled?: boolean;
		href: string;
		keyboardTip?: string[];
		tip: string;
		appearance?: keyof typeof styles.appearance;
	}

	let {
		appearance = "subtle",
		icon,
		loading = false,
		opennewtab = false,
		external = false,
		class: className = "",
		tip,
		href,
		keyboardTip = [],
		disabled = false,
		...rest
	}: Props = $props();

	const isDisabled = $derived(disabled || loading);
	let hovered = $state(false);
</script>

<Anchor
	onmouseenter={() => {
		hovered = true;
	}}
	onmouseleave={() => {
		hovered = false;
	}}
	class="{focusring} {styles.baseIconLinkButton} {isDisabled
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
		<Icon {icon} />
	{/if}
	{#if hovered && !disabled}
		<ToolTip {tip} {keyboardTip} />
	{/if}
</Anchor>
