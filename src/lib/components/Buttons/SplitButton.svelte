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
    if (!related || !(event.currentTarget as HTMLElement).contains(related)) {
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
      const dir = event.shiftKey ? -1 : 1;
      const nextIndex = (currentIndex + dir + menuItems.length) % menuItems.length;
      menuItems[nextIndex]?.focus();
    }
  }

  $: if (open && menuItems.length) {
    setTimeout(() => menuItems[0]?.focus(), 0);
  }
</script>

<div class="split-button" on:focusout={closeMenuOnBlur}>
  <button
    class={`btn ${appearance} main`}
    on:click={handleMainClick}
    type="button"
  >
    {#if iconbefore}
      <span class="icon material-symbols-outlined" aria-hidden="true" translate="no">{iconbefore}</span>
    {/if}
    <slot></slot>
    {#if iconafter}
      <span class="icon material-symbols-outlined" aria-hidden="true" translate="no">{iconafter}</span>
    {/if}
  </button>

  <button
    class={`btn ${appearance} toggle`}
    on:click={toggleMenu}
    aria-haspopup="menu"
    aria-expanded={open}
    aria-controls="dropdown-menu"
    aria-label="More actions"
    type="button"
  >
    <span class="material-symbols-outlined" aria-hidden="true" translate="no">expand_more</span>
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
            type="button"
          >
            {action.label}
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .split-button {
    display: inline-flex;
    position: relative;
    font-size: 1rem;
    line-height: 1;
    vertical-align: middle;
    width: max-content;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    gap: 0.5rem;
    box-sizing: border-box;
    white-space: nowrap;
    font-size: 1rem;
    line-height: 1;
    text-align: center;
    border: none;
    cursor: pointer;
    border-radius: 0.2rem;
    padding: 0 1rem;
    user-select: none;
    transition: background-color 200ms ease, color 200ms ease;
  }

  .main {
    flex: 1 1 auto;
    min-width: 0;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    padding-left: 1rem;
    padding-right: 0.5rem;
  }

  .toggle {
    flex: 0 0 auto;
    width: 2.5rem;
    padding: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .icon {
    font-size: 1rem;
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
