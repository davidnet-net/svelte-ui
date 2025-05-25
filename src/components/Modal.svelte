<script context="module" lang="ts">
  export type ButtonAppearance =
    | "subtle"
    | "default"
    | "primary"
    | "warning"
    | "danger"
    | "icon";

  export interface ModalAction {
    label: string;
    appearance?: ButtonAppearance;
    iconBefore?: string;
    iconAfter?: string;
    onClick: () => void;
  }
</script>

<script lang="ts">
  import Button from "./Button.svelte";
  import IconButton from "./IconButton.svelte";

  export let open: boolean = false;
  export let title: string = "Are you sure?";
  export let desc: string = "This action cannot be undone.";

  // Custom function for close button; if undefined, close button not shown
  export let onClose: (() => void) | null = null;

  // Control whether to show close button (X)
  export let showCloseButton: boolean = false;

  export let ariaLabel: string = "Modal";

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
        <span class="modal-title">{title}</span>

        {#if showCloseButton && onClose}
          <IconButton appearance="subtle" icon="close" onClick={onClose} />
        {/if}
      </div>

      {#if desc}
        <span class="modal-desc">{desc}</span>
      {/if}
    </div>

    <div class="modal-actions">
      {#each actions as action (action.label)}
        <Button
          appearance={action.appearance ?? "default"}
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

<style lang="scss">
  @use "../designtokens" as tokens;
  @use "../fonts";

  .modal {
    display: flex;
    flex-direction: column;
    gap: 40px;

    position: fixed;
    z-index: 9999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    padding: 1.125rem 1.5rem;
    border-radius: 10px;

    min-width: 200px;
    width: fit-content;
    max-width: 90vw;
    background-color: tokens.$modals-background;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 5px;

    font-family: "Open Sans";
    font-weight: 400;
    font-size: 0.9rem;
  }

  .modal-header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    font-family: "Open Sans";
    font-weight: 600;
    font-size: 1.1rem;
  }

  .modal-title {
    color: tokens.$modals-title-text;
  }

  .modal-desc {
    color: tokens.$modals-desc-text;
  }

  .modal-actions {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 0.5rem;
    padding: 0.125rem 0.5rem;
  }
</style>
