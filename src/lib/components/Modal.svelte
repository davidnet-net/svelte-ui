<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import Button from '$lib/components/Buttons/Button.svelte';

  export let title: string;
  export let titleIcon: string | undefined = undefined;
  export let desc: string | undefined = undefined;

  export let options: {
    content: string;
    appearance?: 'primary' | 'subtle' | 'warning' | 'danger' | 'discover';
    iconbefore?: string;
    iconafter?: string;
    onClick: () => void;
  }[] = [];

  export let hasCloseBtn: boolean = true;

  const dispatch = createEventDispatcher();
  let modalRef: HTMLDivElement;

  function closeModal() {
    dispatch('close');
  }

  onMount(() => {
    const previouslyFocused = document.activeElement as HTMLElement;
    modalRef?.focus();
    return () => previouslyFocused?.focus();
  });
</script>

<div class="blanket" tabindex="-1">
  <div
    class="modal"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    aria-describedby="modal-desc"
    bind:this={modalRef}
  >
    {#if hasCloseBtn}
      <button class="close-btn" aria-label="Close modal" on:click={closeModal}>✕</button>
    {/if}

    <h2 id="modal-title" class="modal-title">
      {#if titleIcon}
        <span class="icon material-symbols-outlined" aria-hidden="true">{titleIcon}</span>
      {/if}
      {title}
    </h2>

    {#if desc}
      <p id="modal-desc" class="modal-desc">{desc}</p>
    {/if}

    <div class="button-row">
      {#each options as { appearance = 'subtle', content, onClick, iconbefore, iconafter }}
        <Button
          {appearance}
          {iconbefore}
          {iconafter}
          onClick={onClick}
        >
          {content}
        </Button>
      {/each}
    </div>
  </div>
</div>

<style>
  .blanket {
    position: fixed;
    inset: 0;
    background-color: var(--token-color-blanket-normal);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal {
    background-color: var(--token-color-surface-raised-normal);
    color: var(--token-color-text-default-normal);
    padding: 24px;
    border-radius: 16px;
    width: 100%;
    max-width: 480px;
    position: relative;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    outline: none;
  }

  .modal-title {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    font-weight: bold;
    gap: 0.5rem;
  }

  .icon {
    font-size: 1.5rem;
  }

  .modal-desc {
    margin-top: 8px;
    color: var(--token-color-text-default-secondary);
    font-size: 0.9rem;
  }

  .close-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    background: none;
    border: none;
    font-size: 1.25rem;
    color: var(--token-color-text-default-secondary);
    cursor: pointer;
  }

  .close-btn:hover {
    color: var(--token-color-text-default-normal);
  }

  .button-row {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 24px;
    flex-wrap: wrap;
  }
</style>
