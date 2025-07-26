<script lang="ts">
	import { Loader, ToolTip } from "$lib/index.js";
	import { theme, GetIconColor } from "$lib/stores/theme.js";
	import { browser } from "$app/environment";

	export let appearance: "subtle" | "primary" | "warning" | "danger" | "discover" = "subtle";
	export let icon: string;
	export let lighticon: string | undefined = undefined;
	export let alt: string;
	export let disabled: boolean = false;
	export let loading: boolean = false;
	export let disabletooltip: boolean = false;
	export let actions: { label: string; onClick?: () => void; value?: string | number | object | null }[] = [];

	// Bindbare waarde van de geselecteerde actie
	export let value: string | number | object | null = null;

	let open = false;
	let hovered = false;
	let menuItems: HTMLButtonElement[] = [];

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

	function toggleMenu() {
		if (!disabled) open = !open;
	}

	function handleAction(action: { onClick?: () => void; value?: string | number | object | null }, label: string) {
		if (action.value !== undefined) {
			value = action.value;
		} else {
			value = label;
		}
		if (action.onClick) action.onClick();
		open = false;
	}

	function closeMenuOnBlur(event: FocusEvent) {
		const related = event.relatedTarget as HTMLElement | null;
		if (!related || !event.currentTarget || !(event.currentTarget as HTMLElement).contains(related)) {
			open = false;
		}
	}

	function handleMenuKey(event: KeyboardEvent) {
		const currentIndex = menuItems.findIndex((el) => el === document.activeElement);
		if (event.key === "Escape") {
			open = false;
		} else if (event.key === "ArrowDown") {
			event.preventDefault();
			const nextIndex = (currentIndex + 1) % menuItems.length;
			menuItems[nextIndex]?.focus();
		} else if (event.key === "ArrowUp") {
			event.preventDefault();
			const prevIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
			menuItems[prevIndex]?.focus();
		} else if (event.key === "Tab") {
			event.preventDefault();
			const direction = event.shiftKey ? -1 : 1;
			const nextIndex = (currentIndex + direction + menuItems.length) % menuItems.length;
			menuItems[nextIndex]?.focus();
		}
	}

	$: if (open && menuItems.length) {
		setTimeout(() => menuItems[0]?.focus(), 0);
	}
</script>

<div class="dropdown-wrapper" on:focusout={closeMenuOnBlur}>
	<button
		class={appearance}
		aria-haspopup="menu"
		aria-expanded={open}
		aria-controls="icon-dropdown-menu"
		aria-label={alt}
		on:click={toggleMenu}
		on:mouseenter={() => (hovered = true)}
		on:mouseleave={() => (hovered = false)}
		{disabled}
	>
		{#if loading}
			<Loader />
		{:else if isIconUrl}
			<img src={resolvedIcon} {alt} class="icon image-icon" />
		{:else}
			<span class="icon material-symbols-outlined" translate="no" aria-hidden="true">{resolvedIcon}</span>
		{/if}

		<span class="material-symbols-outlined dropdown-arrow" aria-hidden="true">expand_more</span>

		{#if hovered && !disabletooltip && !open}
			<ToolTip text={alt} />
		{/if}
	</button>

	{#if open}
		<ul class="dropdown" id="icon-dropdown-menu" role="menu" on:keydown={handleMenuKey}>
			{#each actions as action, i (action.label)}
				<li role="none">
					<button role="menuitem" tabindex={i === 0 ? 0 : -1} bind:this={menuItems[i]} on:click={() => handleAction(action, action.label)}>
						{action.label}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.dropdown-wrapper {
		display: inline-block;
		position: relative;
	}

	button {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		height: 2rem;
		padding: 0.5rem;
		box-sizing: border-box;
		white-space: nowrap;
		vertical-align: middle;
		position: relative;
		border: none;
		border-radius: 0.2rem;
		cursor: pointer;
		transition:
			background-color 200ms ease,
			color 200ms ease;
		font-size: 1rem;
		line-height: 1;
		text-align: center;
		text-decoration: none;
		user-select: none;
		gap: 0.4rem;
	}

	.icon {
		font-size: 1.2rem;
	}

	.image-icon {
		width: 1.5rem;
		height: 1.5rem;
		object-fit: contain;
	}

	.dropdown-arrow {
		font-size: 1.3rem;
		opacity: 0.6;
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

	/* Dropdown menu */
	.dropdown {
		position: absolute;
		top: 100%;
		right: 0;
		margin-top: 0.25rem;
		background-color: var(--token-color-surface-overlay-normal);
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 4px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		list-style: none;
		padding: 0.25rem 0;
		z-index: 1000;
		min-width: max-content;
	}

	.dropdown li button {
		background: none;
		border: none;
		width: 100%;
		padding: 0.5rem 1rem;
		text-align: left;
		color: var(--token-color-text-default-normal);
		cursor: pointer;
		font-size: 1rem;
		line-height: 1;
		user-select: none;
	}

	.dropdown li button:hover {
		background-color: var(--token-color-background-subtle-hover);
	}

	.dropdown li button:active {
		background-color: var(--token-color-background-subtle-pressed);
	}
</style>
