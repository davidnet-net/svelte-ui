<script lang="ts">
  export let appearance:
    | 'subtle'
    | 'default'
    | 'primary'
    | 'warning'
    | 'danger'
    | 'icon' = 'default';

  export let iconBefore: string | null = null;
  export let iconAfter: string | null = null;
  export let disabled: boolean = false;
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let onClick: ((_event: MouseEvent) => void) | null = null;

  const test = [1, 2, 3];
  console.log(test);

  const getClass = () => {
      switch (appearance) {
      case 'subtle':
          return 'subtle-btn';
      case 'primary':
          return 'primary-btn';
      case 'warning':
          return 'warning-btn';
      case 'danger':
          return 'danger-btn';
      case 'default':
      default:
          return 'default-btn';
      }
  };
</script>

<button class={getClass()} {disabled} {type} on:click={onClick}>
  {#if iconBefore}
    <span class="material-icons btn-icon">{iconBefore}</span>
  {/if}
  <slot />
  {#if iconAfter}
    <span class="material-icons btn-icon">{iconAfter}</span>
  {/if}
</button>
