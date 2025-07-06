<script lang="ts">
	import { Loader } from "$lib/index.js";

	export let onClick: (() => void) | undefined = undefined;
	export let appearance: "subtle" | "primary" | "warning" | "danger" | "discover" = "subtle";
	export let iconbefore: string | undefined = undefined;
	export let iconafter: string | undefined = undefined;
	export let disabled: boolean = false;
	export let loading: boolean = false;
	export let justifycontent: string | undefined = "center";
	export let stretchwidth: boolean = false;
    export let overidetextcolor: string | undefined = undefined;

	if (loading) {
		disabled = true;
	}

	function handleClick() {
		if (onClick) onClick();
	}
</script>

{#if overidetextcolor}
    <button
        class="{appearance} {stretchwidth ? 'stretch' : ''}"
        on:click={handleClick}
        {disabled}
        style="justify-content: {justifycontent}; color: {overidetextcolor};"
    >
        {#if loading}
            <Loader />
        {:else}
            {#if iconbefore}
                <span
                    class="icon icon-before material-symbols-outlined"
                    translate="no"
                    aria-hidden="true"
                >{iconbefore}</span>
            {/if}
            <slot></slot>
            {#if iconafter}
                <span
                    class="icon icon-after material-symbols-outlined"
                    translate="no"
                    aria-hidden="true"
                >{iconafter}</span>
            {/if}
        {/if}
    </button>
{:else}
    <button
        class="{appearance} {stretchwidth ? 'stretch' : ''}"
        on:click={handleClick}
        {disabled}
        style="justify-content: {justifycontent}"
    >
        {#if loading}
            <Loader />
        {:else}
            {#if iconbefore}
                <span
                    class="icon icon-before material-symbols-outlined"
                    translate="no"
                    aria-hidden="true"
                >{iconbefore}</span>
            {/if}
            <slot></slot>
            {#if iconafter}
                <span
                    class="icon icon-after material-symbols-outlined"
                    translate="no"
                    aria-hidden="true"
                >{iconafter}</span>
            {/if}
        {/if}
    </button>
{/if}
<style>
	button {
		display: inline-flex;
		justify-content: center;
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

	button.stretch {
		width: 100%;
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

	/* Apply appearance */
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
</style>
