<script lang="ts">
	import { Loader, ToolTip } from "$lib/index.js";
	import { browser } from "$app/environment";
	import { theme, GetIconColor } from "$lib/stores/theme.js";

	export let onClick: (event: MouseEvent) => void;
	export let appearance: "subtle" | "primary" | "warning" | "danger" | "discover" = "subtle";
	export let icon: string;
	export let lighticon: string | undefined = undefined;
	export let alt: string;
	export let disabled: boolean = false;
	export let loading: boolean = false;
	export let disabletooltip: boolean = false;

	let hovered = false;

	if (loading) {
		disabled = true;
	}

	let resolvedIcon = icon;
	let isIconUrl = false;

	$: if (browser) {
		const iconColor = GetIconColor($theme);

		resolvedIcon = iconColor === "light" && lighticon ? lighticon : icon;
		isIconUrl = typeof resolvedIcon === "string" && /^(https?:\/\/|data:image\/)/.test(resolvedIcon);
	}
</script>

<button
	class={appearance}
	on:mouseenter={() => (hovered = true)}
	on:mouseleave={() => (hovered = false)}
	on:click={onClick}
	aria-label={alt}
	{disabled}
>
	{#if loading}
		<Loader />
	{:else if isIconUrl}
		<img src={resolvedIcon} {alt} class="icon image-icon" />
	{:else}
		<span class="icon material-symbols-outlined" translate="no" aria-hidden="true">{resolvedIcon}</span>
	{/if}

	{#if hovered && !disabletooltip}
		<ToolTip text={alt} />
	{/if}
</button>

<style>
	button {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		width: 2rem;
		height: 2rem;
		padding: 0.5rem;
		gap: 0.5rem;
		box-sizing: border-box;
		white-space: nowrap;
		vertical-align: middle;
		position: relative;
		margin-right: 0.25rem;

		font-size: 1rem;
		line-height: 1;
		text-align: center;
		text-decoration: none;

		border: none;
		border-radius: 0.2rem;
		cursor: pointer;

		transition:
			background-color 200ms ease,
			color 200ms ease;
	}

	.icon {
		font-size: 1rem;
	}

	.image-icon {
		width: 1rem;
		height: 1rem;
		object-fit: contain;
	}

	/* Appearances */
	button.subtle {
		--bg-normal: var(--token-color-background-subtle-normal);
		--bg-hover: var(--token-color-background-subtle-hover);
		--bg-pressed: var(--token-color-background-subtle-pressed);
		--color-normal: var(--token-color-text-default-normal);
		--color-hover: var(--token-color-text-default-normal);
		--color-pressed: var(--token-color-text-default-normal);
	}

	button.primary {
		--bg-normal: var(--token-color-background-primary-normal);
		--bg-hover: var(--token-color-background-primary-hover);
		--bg-pressed: var(--token-color-background-primary-pressed);
		--color-normal: var(--token-color-text-dark-normal);
		--color-hover: var(--token-color-text-dark-normal);
		--color-pressed: var(--token-color-text-default-normal);
	}

	button.warning {
		--bg-normal: var(--token-color-background-warning-normal);
		--bg-hover: var(--token-color-background-warning-hover);
		--bg-pressed: var(--token-color-background-warning-pressed);
		--color-normal: var(--token-color-text-light-normal);
		--color-hover: var(--token-color-text-light-normal);
		--color-pressed: var(--token-color-text-light-normal);
	}

	button.danger {
		--bg-normal: var(--token-color-background-danger-normal);
		--bg-hover: var(--token-color-background-danger-hover);
		--bg-pressed: var(--token-color-background-danger-pressed);
		--color-normal: var(--token-color-text-dark-normal);
		--color-hover: var(--token-color-text-dark-normal);
		--color-pressed: var(--token-color-text-default-normal);
	}

	button.discover {
		--bg-normal: var(--token-color-background-discover-normal);
		--bg-hover: var(--token-color-background-discover-hover);
		--bg-pressed: var(--token-color-background-discover-pressed);
		--color-normal: var(--token-color-text-dark-normal);
		--color-hover: var(--token-color-text-dark-normal);
		--color-pressed: var(--token-color-text-default-normal);
	}

	button {
		background-color: var(--bg-normal);
		color: var(--color-normal);
	}

	button:hover:not(:disabled) {
		background-color: var(--bg-hover);
		color: var(--color-hover);
	}

	button:active:not(:disabled) {
		background-color: var(--bg-pressed);
		color: var(--color-pressed);
	}

	button:disabled {
		background-color: var(--token-color-background-disabled-normal);
		cursor: not-allowed;
		color: var(--token-color-text-default-normal);
	}

	button:focus {
		outline: 2px solid var(--token-color-focusring);
		background-color: var(--bg-hover);
		color: var(--color-hover);
	}
</style>
