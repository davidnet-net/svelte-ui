<script lang="ts">
  export let appearance:
    | "subtle"
    | "subtle-white"
    | "default"
    | "primary"
    | "warning"
    | "danger";
  export let icon: string;
  export let iconsize: string;
  export let type: "button" | "submit" | "reset" = "button";
  export let href: string;

  $: isImage = icon?.match(/\.(svg|png|jpg|jpeg|gif)$/i);

  export let onClick: ((_event: MouseEvent) => void) | null = null;

  const getClass = () => {
    switch (appearance) {
      case "subtle":
        return "subtle-icon-btn";
      case "subtle-white":
        return "subtle-white-icon-btn";
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

<a
  {href}
  style="font-size={iconsize}"
  class={getClass()}
  {type}
  on:click={onClick}
>
  {#if !isImage}
    <span class="material-icons btn-icon">{icon}</span>
  {:else}
    <img
      class="img-icon"
      src={icon}
      alt="icon"
      width={iconsize}
      height={iconsize}
    />
  {/if}

  <slot />
</a>

<style lang="scss">
  @use "../designtokens" as tokens;
  @use "../fonts" as fonts;

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

    // Size constraints
    height: 2.5rem;
    min-width: 2.5rem;
    max-height: 2.5rem;
    max-width: 2.5rem;
    overflow: hidden;
  }

  .btn-icon {
    @include fonts.material-icon();
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

  .subtle-white-icon-btn {
    @extend %icon-btn-base;
    @include icon-btn-theme(
      tokens.$buttons-subtle-white-text,
      tokens.$buttons-subtle-white-background-normal,
      tokens.$buttons-subtle-white-background-hover,
      tokens.$buttons-subtle-white-background-active,
      tokens.$buttons-subtle-white-background-disabled
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
