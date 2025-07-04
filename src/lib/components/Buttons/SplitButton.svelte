<script lang="ts">
    export let onClick: (() => void) | undefined = undefined;
    export let appearance: "subtle" | "primary" | "warning" | "danger" | "discover" = "subtle";
    export let iconbefore: string | undefined = undefined;
    export let iconafter: string | undefined = undefined;
    export let actions: { label: string; onClick: () => void }[] = [];

    let open = false;
    let menuItems: HTMLButtonElement[] = [];

    function toggleMenu() {
        open = !open;
    }

    function handleMainClick() {
        if (onClick) onClick();
    }

    function handleAction(action: () => void) {
        action();
        open = false;
    }

    function closeMenuOnBlur(event: FocusEvent) {
        const related = event.relatedTarget as HTMLElement | null;
        if (!related || !event.currentTarget || !(event.currentTarget as HTMLElement).contains(related)) {
            open = false;
        }
    }

    function handleMenuKey(event: KeyboardEvent) {
        const currentIndex = menuItems.findIndex(el => el === document.activeElement);
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

<div class="split-button-wrapper" on:focusout={closeMenuOnBlur}>
    <button class={`btn ${appearance}`} on:click={handleMainClick}>
        {#if iconbefore}
            <span class="icon icon-before material-symbols-outlined" translate="no" aria-hidden="true">{iconbefore}</span>
        {/if}
        <slot></slot>
        {#if iconafter}
            <span class="icon icon-after material-symbols-outlined" translate="no" aria-hidden="true">{iconafter}</span>
        {/if}
    </button>

    <button
        class={`btn ${appearance} dropdown-toggle`}
        on:click={toggleMenu}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="dropdown-menu"
        aria-label="More actions"
    >
        <span class="material-symbols-outlined" translate="no" aria-hidden="true">expand_more</span>
    </button>

    {#if open}
        <ul
            class="dropdown"
            id="dropdown-menu"
            role="menu"
            on:keydown={handleMenuKey}
        >
            {#each actions as action, i}
                <li role="none">
                    <button
                        role="menuitem"
                        tabindex={i === 0 ? 0 : -1}
                        bind:this={menuItems[i]}
                        on:click={() => handleAction(action.onClick)}
                    >
                        {action.label}
                    </button>
                </li>
            {/each}
        </ul>
    {/if}
</div>

<style>
    .split-button-wrapper {
        display: inline-flex;
        position: relative;
    }

    .btn {
        font-size: 1rem;
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        padding: 0.4em 0.6em;
        border: none;
        cursor: pointer;
        transition: background-color 200ms ease, color 200ms ease;
        border-radius: 4px;
    }

    .dropdown-toggle {
        border-left: 1px solid rgba(0, 0, 0, 0.1);
        padding-left: 0.6em;
        padding-right: 0.6em;
    }

    .icon {
        font-size: 1rem;
    }

    .subtle {
        background-color: var(--token-color-background-subtle-normal);
        color: var(--token-color-text-default-normal);
    }
    .subtle:hover {
        background-color: var(--token-color-background-subtle-hover);
    }
    .subtle:active {
        background-color: var(--token-color-background-subtle-pressed);
    }

    .primary {
        background-color: var(--token-color-background-primary-normal);
        color: var(--token-color-text-dark-normal);
    }
    .primary:hover {
        background-color: var(--token-color-background-primary-hover);
    }
    .primary:active {
        background-color: var(--token-color-background-primary-pressed);
        color: var(--token-color-text-default-normal);
    }

    .warning {
        background-color: var(--token-color-background-warning-normal);
        color: var(--token-color-text-default-normal);
    }
    .warning:hover {
        background-color: var(--token-color-background-warning-hover);
    }
    .warning:active {
        background-color: var(--token-color-background-warning-pressed);
    }

    .danger {
        background-color: var(--token-color-background-danger-normal);
        color: var(--token-color-text-dark-normal);
    }
    .danger:hover {
        background-color: var(--token-color-background-danger-hover);
    }
    .danger:active {
        background-color: var(--token-color-background-danger-pressed);
        color: var(--token-color-text-default-normal);
    }

    .discover {
        background-color: var(--token-color-background-discover-normal);
        color: var(--token-color-text-dark-normal);
    }
    .discover:hover {
        background-color: var(--token-color-background-discover-hover);
    }
    .discover:active {
        background-color: var(--token-color-background-discover-pressed);
        color: var(--token-color-text-default-normal);
    }

    .dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        margin-top: 0.2rem;
        background-color: var(--token-color-surface-raised-normal);
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
        padding: 0.4rem 0.8rem;
        text-align: left;
        color: var(--token-color-text-default-normal);
        cursor: pointer;
    }

    .dropdown li button:hover {
        background-color: var(--token-color-surface-raised-hover);
    }

    .dropdown li button:active {
        background-color: var(--token-color-surface-raised-pressed);
    }
</style>
