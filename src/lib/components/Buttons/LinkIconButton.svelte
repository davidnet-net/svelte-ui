<script lang="ts">
    import Tooltip from "$lib/components/Tooltip.svelte";

    export let appearance: "subtle" | "primary" | "warning" | "danger" | "discover" = "subtle";
    export let icon: string;
    export let alt: string;
    export let href: string;

    let hovered = false;
</script>

<a
    class={appearance}
    {href}
    aria-label={alt}
    on:mouseenter={() => (hovered = true)}
    on:mouseleave={() => (hovered = false)}
>
    <span class="icon icon-before material-symbols-outlined" translate="no" aria-hidden="true"
        >{icon}</span
    >

    {#if hovered}
        <Tooltip text={alt} />
    {/if}
</a>

<style>
    a {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        min-width: 2rem;
        min-height: 2rem;
        padding: 0.5rem 0.5rem;
        gap: 0.5rem;
        box-sizing: border-box;
        white-space: nowrap;
        vertical-align: middle;
        position: relative;

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
