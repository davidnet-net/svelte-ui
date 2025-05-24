<script context="module" lang="ts">
  export type ButtonAppearance =
    | 'subtle'
    | 'default'
    | 'primary'
    | 'warning'
    | 'danger'
    | 'icon';

  export interface ModalAction {
    label: string;
    appearance?: ButtonAppearance;
    iconBefore?: string;
    iconAfter?: string;
    onClick: () => void;
  }
</script>

<script lang="ts">
  import Button from './Button.svelte';
  import IconButton from './IconButton.svelte';

  export let open: boolean = false;
  export let title: string = 'Are you sure?';
  export let desc: string = 'This action cannot be undone.';

  // Custom function for close button; if undefined, close button not shown
  export let onClose: (() => void) | null = null;

  // Control whether to show close button (X)
  export let showCloseButton: boolean = false;

  export let ariaLabel: string = 'Modal';

  export let actions: ModalAction[] = [];
</script>

{#if open}
  <div
    class="modal"
    role="dialog"
    aria-modal="true"
    aria-label={ariaLabel}
    tabindex="0"
  >
    <div class="modal-header">
      <div class="modal-header-top">
        <span class="modal-text">{title}</span>

        {#if showCloseButton && onClose}
          <IconButton appearance="subtle" icon="close" onClick={onClose} />
        {/if}
      </div>

      {#if desc}
        <span>{desc}</span>
      {/if}
    </div>

    <div class="modal-actions">
      {#each actions as action (action.label)}
        <Button
          appearance={action.appearance ?? 'default'}
          iconBefore={action.iconBefore}
          iconAfter={action.iconAfter}
          onClick={() => action.onClick()}
        >
          {action.label}
        </Button>
      {/each}
    </div>
  </div>
{/if}
