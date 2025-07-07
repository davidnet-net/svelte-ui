<script lang="ts">
  import { onMount } from 'svelte';
  import { tick } from 'svelte';

  export let text: string;
  let tooltipEl: HTMLDivElement;
  let nudgeX = 0;

  async function adjustPositionOnce() {
    await tick();

    if (!tooltipEl) return;

    const rect = tooltipEl.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    if (rect.left < 0) {
      nudgeX = -rect.left + 8;
    } else if (rect.right > viewportWidth) {
      nudgeX = viewportWidth - rect.right - 8;
    } else {
      nudgeX = 0;
    }
  }

  onMount(() => {
    adjustPositionOnce();
  });

  $: if (text) {
    adjustPositionOnce();
  }
</script>

<div
  class="tooltip"
  role="tooltip"
  bind:this={tooltipEl}
  style="transform: translateX(calc(-50% + {nudgeX}px)); --arrow-offset: {nudgeX}px;"
>
  {text}
</div>

<style>
  .tooltip {
    position: absolute;
    top: 100%;
    left: 50%;
    margin-top: 10px;
    background-color: var(--token-color-surface-inverse-raised-normal);
    color: var(--token-color-text-inverse-normal);
    padding: 0.25em 0.5em;
    font-size: 0.75rem;
    border-radius: 3px;
    white-space: nowrap;
    pointer-events: none;
    user-select: none;
    z-index: 10;
    box-sizing: border-box;
    line-height: 1;
  }

  .tooltip::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(calc(-50% - var(--arrow-offset, 0px)));
    border-width: 0 6px 6px 6px;
    border-style: solid;
    border-color: transparent transparent var(--token-color-surface-inverse-raised-normal) transparent;
  }
</style>
