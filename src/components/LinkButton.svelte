<script lang="ts">
  export let appearance:
    | "subtle"
    | "subtle-white"
    | "default"
    | "primary"
    | "warning"
    | "danger" = "default";
  export let iconBefore: string = "open_in_new";
  export let iconAfter: string | null = null;
  export let href: string;

  export let onClick: ((_event: MouseEvent) => void) | null = null;

  const getClass = () => {
    switch (appearance) {
      case "subtle":
        return "subtle-btn";
      case "subtle-white":
        return "subtle-white-btn";
      case "primary":
        return "primary-btn";
      case "warning":
        return "warning-btn";
      case "danger":
        return "danger-btn";
      case "default":
        return "default-btn";
      default:
        return "default-btn";
    }
  };
</script>

<a class={getClass()} {href} on:click={onClick}>
  {#if iconBefore}
    <span class="material-icons btn-icon">{iconBefore}</span>
  {/if}
  <slot />
  {#if iconAfter}
    <span class="material-icons btn-icon">{iconAfter}</span>
  {/if}
</a>

<style lang="scss">
  @use "../designtokens" as tokens;
  @use "../fonts" as fonts;

  @mixin button-base {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    min-width: 5rem;
    padding: 0.5rem 1rem;
    margin: 0;

    border: none;
    border-radius: 5px;
    cursor: pointer;

    font-family: tokens.$buttons-font-family;
    font-weight: 600;
    text-align: center;
    text-decoration: none;

    line-height: 1.2;
  }

  @mixin button-variant($text, $bg, $hover, $active, $disabled) {
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

  .btn-icon {
    font-size: 1.2rem;
    line-height: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    @include fonts.material-icon();
  }

  // Subtle Button
  .subtle-btn {
    @include button-base;
    @include button-variant(
      tokens.$buttons-subtle-text,
      tokens.$buttons-subtle-background-normal,
      tokens.$buttons-subtle-background-hover,
      tokens.$buttons-subtle-background-active,
      tokens.$buttons-subtle-background-disabled
    );
  }

  .subtle-white-btn {
    @include button-base;
    @include button-variant(
      tokens.$buttons-subtle-white-text,
      tokens.$buttons-subtle-white-background-normal,
      tokens.$buttons-subtle-white-background-hover,
      tokens.$buttons-subtle-white-background-active,
      tokens.$buttons-subtle-white-background-disabled
    );
  }

  // Default Button
  .default-btn {
    @include button-base;
    @include button-variant(
      tokens.$buttons-default-text,
      tokens.$buttons-default-background-normal,
      tokens.$buttons-default-background-hover,
      tokens.$buttons-default-background-active,
      tokens.$buttons-default-background-disabled
    );
  }

  // Primary Button
  .primary-btn {
    @include button-base;
    @include button-variant(
      tokens.$buttons-primary-text,
      tokens.$buttons-primary-background-normal,
      tokens.$buttons-primary-background-hover,
      tokens.$buttons-primary-background-active,
      tokens.$buttons-primary-background-disabled
    );
  }

  // Warning Button
  .warning-btn {
    @include button-base;
    @include button-variant(
      tokens.$buttons-warning-text,
      tokens.$buttons-warning-background-normal,
      tokens.$buttons-warning-background-hover,
      tokens.$buttons-warning-background-active,
      tokens.$buttons-warning-background-disabled
    );
  }

  // Danger Button
  .danger-btn {
    @include button-base;
    @include button-variant(
      tokens.$buttons-danger-text,
      tokens.$buttons-danger-background-normal,
      tokens.$buttons-danger-background-hover,
      tokens.$buttons-danger-background-active,
      tokens.$buttons-danger-background-disabled
    );
  }
</style>
