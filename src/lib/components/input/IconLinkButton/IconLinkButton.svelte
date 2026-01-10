<script lang="ts">
	import type { HTMLAnchorAttributes } from "svelte/elements";

	import Loader from "$lib/components/loading/Spinner/Spinner.svelte";
	import ToolTip from "$lib/components/overlays/ToolTip/ToolTip.svelte";
	import Icon from "$lib/components/primitives/Icon/Icon.svelte";

	import { focusring } from "../../../styles/global.css.ts";
	import type { iconType } from "../../../types/Icon.ts";
	import { styles } from "./IconLinkButton.css.ts";

	interface Props extends HTMLAnchorAttributes {
		icon: iconType;

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
	const target = $derived(opennewtab || external ? "_blank" : rest.target);
	const rel = $derived(opennewtab || external ? "noopener noreferrer" : rest.rel);
	let hovered = $state(false);
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a
	onmouseenter={() => {
		hovered = true;
	}}
	onmouseleave={() => {
		hovered = false;
	}}
	class="{focusring} {styles.baseIconLinkButton} {isDisabled
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
		<Icon {icon} />
	{/if}
	{#if hovered && !disabled}
		<ToolTip {tip} {keyboardTip} />
	{/if}
</a>
