<script lang="ts">
    import { Button, Space, LinkButton } from "$lib/index.js";

    export let appearance: "info" | "warning" | "error" | "success" = "info";
    export let title: string | undefined = undefined;
    export let actions: {
        content: string;
        appearance?: "primary" | "subtle" | "warning" | "danger" | "discover" | "link";
        iconbefore?: string;
        iconafter?: string;
        href?: string | undefined;
        onClick: () => void;
    }[] = [];

    const icons = {
        info: "info",
        warning: "warning",
        error: "error",
        success: "check_circle"
    };

    const borderColors = {
        info: "var(--token-color-text-information)",
        warning: "var(--token-color-text-warning)",
        error: "var(--token-color-text-danger)",
        success: "var(--token-color-text-success)"
    };

    const bgColors = {
        info: "rgba(0, 85, 204, 0.05)",
        warning: "rgba(165, 72, 0, 0.05)",
        error: "rgba(174, 46, 36, 0.05)",
        success: "rgba(33, 110, 78, 0.05)"
    };

    const iconColors = borderColors;
</script>

<div
    class="blocknote"
    style="
    background-color: {bgColors[appearance]};
    border: 1px solid {borderColors[appearance]};
  "
>
    <span
        class="icon material-symbols-outlined"
        style="color: {iconColors[appearance]}"
        translate="no"
        aria-hidden="true"
    >
        {icons[appearance]}
    </span>

    <div class="content">
        {#if title}
            <div class="title">{title}</div>
        {/if}
        <div class="description">
            <slot />
        </div>
        <Space height="10px"></Space>
        <div class="actions">
            {#each actions as { appearance = 'subtle', content, onClick, iconbefore, iconafter, href }}
                {#if appearance === "link"}
                    <a {href}>{content}</a>
                {:else if href}
                    <LinkButton {href} {appearance} {iconbefore} {iconafter}>
                        {content}
                    </LinkButton>
                {:else}
                    <Button {appearance} {iconbefore} {iconafter} {onClick}>
                        {content}
                    </Button>
                {/if}
            {/each}
        </div>
    </div>
</div>

<style>
    .blocknote {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        padding: 1rem;
        border-radius: 6px;
        font-family: sans-serif;
    }

    @media (min-width: 1000px) {
        .blocknote {
            width: 750px;
            max-width: fit-content;
        }
    }

    .icon {
        font-size: 20px;
        margin-top: 0.15rem;
        flex-shrink: 0;
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        color: var(--token-color-text-default-normal);
    }

    .title {
        font-weight: 600;
        margin-bottom: 0.25rem;
        color: inherit;
    }

    .description {
        font-size: 0.95rem;
        color: var(--token-color-text-default-secondary);
        margin-bottom: 0.5rem;
    }

    .actions :global(button) {
        margin-right: 0.5rem;
    }

    .actions :global(a) {
        margin-right: 0.5rem;
    }

    .actions a {
        transition:
            background-color 200ms ease,
            color 200ms ease;
    }

    /* No :global here due not wanting to change the LinkButton */
    .actions a:hover {
        color: #3366cc;
    }
</style>
