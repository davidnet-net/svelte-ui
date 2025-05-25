<script lang="ts">
  export let appearance:
    | "subtle"
    | "default"
    | "primary"
    | "warning"
    | "danger"
    | "icon";
  export let icon: string;
  export let disabled: boolean = false;
  export let type: "button" | "submit" | "reset" = "button";

  export let onClick: ((_event: MouseEvent) => void) | null = null;

  const getClass = () => {
    switch (appearance) {
      case "subtle":
        return "subtle-icon-btn";
      case "primary":
        return "primary-icon-btn";
      case "warning":
        return "warning-icon-btn";
      case "danger":
        return "danger-icon-btn";
      case "default":
        return "default-icon-btn";
      default:
        return "default-icon-btn";
    }
  };
</script>

<button class={getClass()} {disabled} {type} on:click={onClick}>
  <span class="material-icons btn-icon">{icon}</span>
  <slot />
</button>

<style lang="scss">
  @use "../designtokens" as tokens;
  @use "../fonts";

  /* Shared Button Styles */
  %icon-btn-base {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    margin: 0;
    padding: 0.2rem 0.3rem;

    border: none;
    border-radius: 5px;
    cursor: pointer;

    font-family: tokens.$buttons-font-family;
    font-weight: 600;
    text-align: center;

    line-height: 1.2;
  }

  .btn-icon {
    font-size: 1.2rem;
    line-height: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  // Mixin for stateful styles
  @mixin icon-btn-theme($text, $bg, $hover, $active, $disabled) {
    color: $text;
    background-color: $bg;

    &:hover {
      background-color: $hover;
    }

    &:active {
      background-color: $active;
    }

    &:disabled {
      background-color: $disabled;
      cursor: not-allowed;
    }
  }

  /* Variants */
  .subtle-icon-btn {
    @extend %icon-btn-base;
    @include icon-btn-theme(
      tokens.$buttons-subtle-text,
      tokens.$buttons-subtle-background-normal,
      tokens.$buttons-subtle-background-hover,
      tokens.$buttons-subtle-background-active,
      tokens.$buttons-subtle-background-disabled
    );
  }

  .default-icon-btn {
    @extend %icon-btn-base;
    @include icon-btn-theme(
      tokens.$buttons-default-text,
      tokens.$buttons-default-background-normal,
      tokens.$buttons-default-background-hover,
      tokens.$buttons-default-background-active,
      tokens.$buttons-default-background-disabled
    );
  }

  .primary-icon-btn {
    @extend %icon-btn-base;
    @include icon-btn-theme(
      tokens.$buttons-primary-text,
      tokens.$buttons-primary-background-normal,
      tokens.$buttons-primary-background-hover,
      tokens.$buttons-primary-background-active,
      tokens.$buttons-primary-background-disabled
    );
  }

  .warning-icon-btn {
    @extend %icon-btn-base;
    @include icon-btn-theme(
      tokens.$buttons-warning-text,
      tokens.$buttons-warning-background-normal,
      tokens.$buttons-warning-background-hover,
      tokens.$buttons-warning-background-active,
      tokens.$buttons-warning-background-disabled
    );
  }

  .danger-icon-btn {
    @extend %icon-btn-base;
    @include icon-btn-theme(
      tokens.$buttons-danger-text,
      tokens.$buttons-danger-background-normal,
      tokens.$buttons-danger-background-hover,
      tokens.$buttons-danger-background-active,
      tokens.$buttons-danger-background-disabled
    );
  }
</style>
