<script lang="ts">
	export let href: string | undefined = undefined;
	export let appearance: "subtle" | "primary" | "warning" | "danger" | "discover" = "subtle";
	export let iconbefore: string | undefined = undefined;
	export let iconafter: string | undefined = undefined;
	export let justifycontent: string | undefined = "center";
	export let overidetextcolor: string | undefined = undefined;
	export let stretchwidth: boolean = false;
</script>

{#if overidetextcolor}
	<a class="{appearance} {stretchwidth ? 'stretch' : ''}" {href} style="justify-content: {justifycontent} ; color: {overidetextcolor};">
		{#if iconbefore}
			<span class="icon icon-before material-symbols-outlined" translate="no" aria-hidden="true">{iconbefore}</span>
		{/if}
		<slot></slot>
		{#if iconafter}
			<span class="icon icon-after material-symbols-outlined" translate="no" aria-hidden="true"> {iconafter}</span>
		{/if}
	</a>
{:else}
	<a class="{appearance} {stretchwidth ? 'stretch' : ''}" {href} style="justify-content: {justifycontent};">
		{#if iconbefore}
			<span class="icon icon-before material-symbols-outlined" translate="no" aria-hidden="true">{iconbefore}</span>
		{/if}
		<slot></slot>
		{#if iconafter}
			<span class="icon icon-after material-symbols-outlined" translate="no" aria-hidden="true"> {iconafter}</span>
		{/if}
	</a>
{/if}

<style>
	a {
		display: inline-flex;
		align-items: center;
		min-width: 120px;
		height: 2rem;
		padding: 0.5rem 1rem;
		gap: 0.5rem;
		box-sizing: border-box;
		white-space: nowrap;
		vertical-align: middle;
		position: relative;
		margin-right: 0.25rem;

		font-size: 1rem;
		line-height: 1;
		text-align: left;
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

	a.stretch {
		width: 100%;
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
</style>
