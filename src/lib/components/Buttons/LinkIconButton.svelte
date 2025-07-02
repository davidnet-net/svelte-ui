<!-- src/lib/components/Buttons/LinkIconButton.svelte -->
<script lang="ts">
  import Tooltip from '$lib/components/Tooltip.svelte';

  export let appearance: "subtle" | "primary" | "warning" | "danger" | "discover" = "subtle";
  export let icon: string;
  export let alt: string;
  export let href: string;

  let hovered = false;
</script>

<a
  class={appearance}
  href={href}
  aria-label={alt}
  on:mouseenter={() => (hovered = true)}
  on:mouseleave={() => (hovered = false)}
>
  <span class="icon icon-before material-symbols-outlined" aria-hidden="true">{icon}</span>

  {#if hovered}
    <Tooltip text={alt} />
  {/if}
</a>

<style>
  a {
    position: relative;
    font-size: 1rem;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.6em;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition:
      background-color 200ms ease,
      color 200ms ease;
  }

  .icon {
    font-size: 1.2rem;
  }

  /* Appearance styles */
  .subtle {
    background-color: var(--token-color-background-subtle-normal);
    color: var(--token-color-text-default-normal);
  }
  .primary {
    background-color: var(--token-color-background-primary-normal);
    color: var(--token-color-text-dark-normal);
  }
  .warning {
    background-color: var(--token-color-background-warning-normal);
    color: var(--token-color-text-default-normal);
  }
  .danger {
    background-color: var(--token-color-background-danger-normal);
    color: var(--token-color-text-dark-normal);
  }
  .discover {
    background-color: var(--token-color-background-discover-normal);
    color: var(--token-color-text-dark-normal);
  }

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
