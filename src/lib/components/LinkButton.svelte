<script lang="ts">
    export let href: string | undefined = undefined;
    export let appearance: "subtle" | "primary" | "warning" | "danger" | "discover" = "subtle";
    export let iconbefore: string | undefined = undefined;
    export let iconafter: string | undefined = undefined;
</script>

<a class={appearance} {href}>
    {#if iconbefore}
        <span class="icon icon-before material-symbols-outlined">{iconbefore}</span>
    {/if}
    <slot></slot>
    {#if iconafter}
        <span class="icon icon-after material-symbols-outlined"> {iconafter}</span>
    {/if}
</a>

<style>
    a {
        font-size: 1rem;
        text-decoration: none;
        display: inline-flex;
        gap: 0.2rem;
        padding: 0.6em 1em;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition:
            background-color 200ms ease,
            color 200ms ease;
    }

    .icon {
      font-size: 1rem;
    }
    
    /* Appearance styles */
    .subtle {
        background-color: var(--token-color-background-subtle-normal);
        color: var(--token-color-text-default-normal);
    }
    .primary {
        background-color: var(--token-color-background-primary-normal);
        color: var(--token-color-text-inverse-normal);
    }
    .warning {
        background-color: var(--token-color-background-warning-normal);
        color: var(--token-color-text-inverse-normal);
    }
    .danger {
        background-color: var(--token-color-background-danger-normal);
        color: var(--token-color-text-inverse-normal);
    }
    .discover {
        background-color: var(--token-color-background-discover-normal);
        color: var(--token-color-text-inverse-normal);
    }

    /* Hover states */
    .subtle:hover {
        background-color: var(--token-color-background-subtle-hover);
    }
    .primary:hover {
        background-color: var(--token-color-background-primary-hover);
    }
    .warning:hover {
        background-color: var(--token-color-background-warning-hover);
    }
    .danger:hover {
        background-color: var(--token-color-background-danger-hover);
    }
    .discover:hover {
        background-color: var(--token-color-background-discover-hover);
    }

    /* Active states */
    .subtle:active {
        background-color: var(--token-color-background-subtle-pressed);
    }
    .primary:active {
        background-color: var(--token-color-background-primary-pressed);
        color: var(--token-color-text-default-normal);
    }
    .warning:active {
        background-color: var(--token-color-background-warning-pressed);
        color: var(--token-color-text-default-normal);
    }
    .danger:active {
        background-color: var(--token-color-background-danger-pressed);
        color: var(--token-color-text-default-normal);
    }
    .discover:active {
        background-color: var(--token-color-background-discover-pressed);
        color: var(--token-color-text-default-normal);
    }
</style>
