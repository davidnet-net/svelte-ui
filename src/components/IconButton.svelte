<script lang="ts">
  export let appearance:
    | 'subtle'
    | 'default'
    | 'primary'
    | 'warning'
    | 'danger'
    | 'icon';
  export let icon: string;
  export let disabled: boolean = false;
  export let type: 'button' | 'submit' | 'reset' = 'button';

  export let onClick: ((_event: MouseEvent) => void) | null = null;

  const getClass = () => {
      switch (appearance) {
      case 'subtle':
          return 'subtle-icon-btn';
      case 'primary':
          return 'primary-icon-btn';
      case 'warning':
          return 'warning-icon-btn';
      case 'danger':
          return 'danger-icon-btn';
      case 'default':
          return 'default-icon-btn';
      default:
          return 'default-icon-btn';
      }
  };
</script>

<button class={getClass()} {disabled} {type} on:click={onClick}>
  <span class="material-icons btn-icon">{icon}</span>
  <slot />
</button>
