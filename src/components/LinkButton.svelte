<script lang="ts">
  export let appearance: 'default' | 'primary' | 'warning' | 'danger' | 'icon' =
    'default';
  export let iconBefore: string = 'open_in_new';
  export let iconAfter: string | null = null;
  export let href: string;

  export let onClick: ((_event: MouseEvent) => void) | null = null;

  const getClass = () => {
      switch (appearance) {
      case 'primary':
          return 'primary-btn';
      case 'warning':
          return 'warning-btn';
      case 'danger':
          return 'danger-btn';
      case 'default':
          return 'default-btn';
      default:
          return 'default-btn';
      }
  };
</script>

<a class={getClass()} {href}>
  {#if iconBefore}
    <span class="material-icons btn-icon">{iconBefore} on:click={onClick}</span>
  {/if}
  <slot />
  {#if iconAfter}
    <span class="material-icons btn-icon">{iconAfter}</span>
  {/if}
</a>
