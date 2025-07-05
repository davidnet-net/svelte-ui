<script lang="ts">
    export let appearance: "subtle" | "primary" | "warning" | "danger" | "discover" = "subtle";
    export let actions: { label: string; onClick: () => void }[] = [];

    let open = false;
    let menuItems: HTMLButtonElement[] = [];

    function toggleMenu() {
        open = !open;
    }

    function handleAction(action: () => void) {
        action();
        open = false;
    }

    function closeMenuOnBlur(event: FocusEvent) {
        const related = event.relatedTarget as HTMLElement | null;
        if (
            !related ||
            !event.currentTarget ||
            !(event.currentTarget as HTMLElement).contains(related)
        ) {
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
        class={`btn ${appearance} dropdown-toggle`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="dropdown-menu"
        on:click={toggleMenu}
    >
        <span class="material-symbols-outlined dropdown-arrow" aria-hidden="true">menu</span>
        <slot>Menu</slot>
        <span class="material-symbols-outlined dropdown-arrow" aria-hidden="true">expand_more</span>
    </button>

    {#if open}
        <ul class="dropdown" id="dropdown-menu" role="menu" on:keydown={handleMenuKey}>
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
    .dropdown-wrapper {
        display: inline-block;
        position: relative;
    }

    .btn {
        font-size: 1rem;
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        padding: 0.4em 0.8em;
        border: none;
        cursor: pointer;
        line-height: 0;
        box-sizing: border-box;
        transition:
            background-color 200ms ease,
            color 200ms ease;
        border-radius: 4px;
        user-select: none;
    }

    .dropdown-toggle {
        min-width: 120px;
        justify-content: center;
        gap: 0.4rem;
    }

    .icon {
        font-size: 1rem;
    }

    .dropdown-arrow {
        font-size: 1.2rem;
    }

    /* Appearances */
    .subtle {
        --bg-normal: var(--token-color-background-subtle-normal);
        --bg-hover: var(--token-color-background-subtle-hover);
        --bg-pressed: var(--token-color-background-subtle-pressed);
        --color-normal: var(--token-color-text-default-normal);
        --color-hover: var(--token-color-text-default-normal);
        --color-pressed: var(--token-color-text-default-normal);
    }

    .primary {
        --bg-normal: var(--token-color-background-primary-normal);
        --bg-hover: var(--token-color-background-primary-hover);
        --bg-pressed: var(--token-color-background-primary-pressed);
        --color-normal: var(--token-color-text-dark-normal);
        --color-hover: var(--token-color-text-dark-normal);
        --color-pressed: var(--token-color-text-default-normal);
    }

    .warning {
        --bg-normal: var(--token-color-background-warning-normal);
        --bg-hover: var(--token-color-background-warning-hover);
        --bg-pressed: var(--token-color-background-warning-pressed);
        --color-normal: var(--token-color-text-light-normal);
        --color-hover: var(--token-color-text-light-normal);
        --color-pressed: var(--token-color-text-light-normal);
    }

    .danger {
        --bg-normal: var(--token-color-background-danger-normal);
        --bg-hover: var(--token-color-background-danger-hover);
        --bg-pressed: var(--token-color-background-danger-pressed);
        --color-normal: var(--token-color-text-dark-normal);
        --color-hover: var(--token-color-text-dark-normal);
        --color-pressed: var(--token-color-text-default-normal);
    }

    .discover {
        --bg-normal: var(--token-color-background-discover-normal);
        --bg-hover: var(--token-color-background-discover-hover);
        --bg-pressed: var(--token-color-background-discover-pressed);
        --color-normal: var(--token-color-text-dark-normal);
        --color-hover: var(--token-color-text-dark-normal);
        --color-pressed: var(--token-color-text-default-normal);
    }

    /* Apply colors */
    .btn {
        background-color: var(--bg-normal);
        color: var(--color-normal);
    }

    .btn:hover:not(:disabled) {
        background-color: var(--bg-hover);
        color: var(--color-hover);
    }

    .btn:active:not(:disabled) {
        background-color: var(--bg-pressed);
        color: var(--color-pressed);
    }

    .btn:disabled {
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
