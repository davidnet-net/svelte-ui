<script lang="ts">
  import Toast from '$lib/components/Toast.svelte';
  import { toasts, removeToast } from '$lib/stores/toasts.js';

  const positions = [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ] as const;

  type Position = typeof positions[number];
</script>

{#each positions as pos}
  <div class="toaster {pos}">
    {#each $toasts.filter(t => t.position === pos) as t (t.id)}
      <Toast {...t} onClose={() => removeToast(t.id)} position={pos} />
    {/each}
  </div>
{/each}

<style>
  .toaster {
    position: fixed;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 100vw;
    pointer-events: none;
  }

  .top-left {
    top: 1rem;
    left: 1rem;
    align-items: flex-start;
  }
  .top-center {
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
  }
  .top-right {
    top: 1rem;
    right: 1rem;
    align-items: flex-end;
  }
  .bottom-left {
    bottom: 1rem;
    left: 1rem;
    align-items: flex-start;
  }
  .bottom-center {
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
  }
  .bottom-right {
    bottom: 1rem;
    right: 1rem;
    align-items: flex-end;
  }
</style>
