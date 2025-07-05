<script lang="ts">
    import Loader from "$lib/components/Loader.svelte";

    export let onClick: (() => void) | undefined = undefined;
    export let appearance: "subtle" | "primary" | "warning" | "danger" | "discover" = "subtle";
    export let iconbefore: string | undefined = undefined;
    export let iconafter: string | undefined = undefined;
    export let disabled: boolean = false;
    export let loading: boolean = false;

    if (loading) {
        disabled = true;
    }

    function handleClick() {
        if (onClick) onClick();
    }
</script>

<button class={appearance} on:click={handleClick} {disabled}>
    {#if loading}
        <Loader></Loader>
    {:else}
        {#if iconbefore}
            <span
                class="icon icon-before material-symbols-outlined"
                translate="no"
                aria-hidden="true">{iconbefore}</span
            >
        {/if}
        <slot></slot>
        {#if iconafter}
            <span
                class="icon icon-after material-symbols-outlined"
                translate="no"
                aria-hidden="true"
            >
                {iconafter}</span
            >
        {/if}
    {/if}
</button>

<style>
button {
  text-align: center;
  min-width: 120px;
  min-height: 2rem;
  font-size: 1rem;
  text-decoration: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.2rem;
  cursor: pointer;
  line-height: 1;
  box-sizing: border-box;
  transition: background-color 200ms ease, color 200ms ease;
  white-space: nowrap;
  vertical-align: middle;
}

.icon {
  font-size: 1rem;
}

/* Define appearances in a single block with CSS custom properties */
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
  --color-normal: var(--token-color-text-default-normal);
  --color-hover: var(--token-color-text-default-normal);
  --color-pressed: var(--token-color-text-default-normal);
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

/* Use the custom properties */
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
  color: var(--color-normal); /* You can customize this if needed */
}

</style>
