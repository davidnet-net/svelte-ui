<script lang="ts">
	import { ToolTip } from "$lib/index.js";
	import { browser } from "$app/environment";
	import { theme, GetIconColor } from "$lib/stores/theme.js";

	export let appearance: "subtle" | "primary" | "warning" | "danger" | "discover" = "subtle";
	export let icon: string;
	export let lighticon: string | undefined = undefined;
	export let alt: string;
	export let href: string;
	export let disabletooltip: boolean = false;
	export let roundimage: boolean = false;
	export let anonymous: boolean = false;

	let hovered = false;

	let resolvedIcon = icon;
	let isIconUrl = false;

	$: if (browser) {
		const iconColor = GetIconColor($theme);

		resolvedIcon = iconColor === "light" && lighticon ? lighticon : icon;
		isIconUrl = typeof resolvedIcon === "string" && /^(https?:\/\/|data:image\/)/.test(resolvedIcon);
	}

	let roundclass = "";
	$: if (roundimage) {
		roundclass = "roundimage";
	}
</script>

<a class={appearance} {href} aria-label={alt} on:mouseenter={() => (hovered = true)} on:mouseleave={() => (hovered = false)}>
	{#if isIconUrl}
		{#if anonymous}
			<img src={resolvedIcon} crossorigin="anonymous" {alt} class="icon image-icon {roundclass}" />
		{:else}
			<img src={resolvedIcon} {alt} class="icon image-icon {roundclass}" />
		{/if}
	{:else}
		<span class="icon material-symbols-outlined" translate="no" aria-hidden="true">{resolvedIcon}</span>
	{/if}

	{#if hovered && !disabletooltip}
		<ToolTip text={alt} />
	{/if}
</a>

<style>
	a {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		width: 2rem;
		height: 2rem;
		padding: 0.5rem 0.5rem;
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

	.roundimage {
		border-radius: 50%;
	}

	/* Appearances */
	a.subtle {
		--bg-normal: var(--token-color-background-subtle-normal);
		--bg-hover: var(--token-color-background-subtle-hover);
		--bg-pressed: var(--token-color-background-subtle-pressed);
		--color-normal: var(--token-color-text-default-normal);
		--color-hover: var(--token-color-text-default-normal);
		--color-pressed: var(--token-color-text-default-normal);
	}

	a.primary {
		--bg-normal: var(--token-color-background-primary-normal);
		--bg-hover: var(--token-color-background-primary-hover);
		--bg-pressed: var(--token-color-background-primary-pressed);
		--color-normal: var(--token-color-text-dark-normal);
		--color-hover: var(--token-color-text-dark-normal);
		--color-pressed: var(--token-color-text-default-normal);
	}

	a.warning {
		--bg-normal: var(--token-color-background-warning-normal);
		--bg-hover: var(--token-color-background-warning-hover);
		--bg-pressed: var(--token-color-background-warning-pressed);
		--color-normal: var(--token-color-text-light-normal);
		--color-hover: var(--token-color-text-light-normal);
		--color-pressed: var(--token-color-text-light-normal);
	}

	a.danger {
		--bg-normal: var(--token-color-background-danger-normal);
		--bg-hover: var(--token-color-background-danger-hover);
		--bg-pressed: var(--token-color-background-danger-pressed);
		--color-normal: var(--token-color-text-dark-normal);
		--color-hover: var(--token-color-text-dark-normal);
		--color-pressed: var(--token-color-text-default-normal);
	}

	a.discover {
		--bg-normal: var(--token-color-background-discover-normal);
		--bg-hover: var(--token-color-background-discover-hover);
		--bg-pressed: var(--token-color-background-discover-pressed);
		--color-normal: var(--token-color-text-dark-normal);
		--color-hover: var(--token-color-text-dark-normal);
		--color-pressed: var(--token-color-text-default-normal);
	}

	/* Apply appearancessss */
	a {
		background-color: var(--bg-normal);
		color: var(--color-normal);
	}

	a:hover:not(:disabled) {
		background-color: var(--bg-hover);
		color: var(--color-hover);
	}

	a:active:not(:disabled) {
		background-color: var(--bg-pressed);
		color: var(--color-pressed);
	}

	a:disabled {
		background-color: var(--token-color-background-disabled-normal);
		cursor: not-allowed;
		color: var(--token-color-text-default-normal);
	}

	a:focus {
		outline: 2px solid var(--token-color-focusring);
		background-color: var(--bg-hover);
		color: var(--color-hover);
	}
</style>
