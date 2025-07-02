<!-- src/lib/components/Tooltip.svelte -->
<script lang="ts">
  export let text: string;
</script>

<div class="tooltip" role="tooltip">
  {text}
</div>

<style>
  .tooltip {
    position: absolute;
    bottom: -2.4em;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.75);
    color: white;
    padding: 0.25em 0.5em;
    font-size: 0.75rem;
    border-radius: 3px;
    white-space: nowrap;
    pointer-events: none;
    user-select: none;
    z-index: 10;
  }

  .tooltip::after {
    content: "";
    position: absolute;
    top: -5%;
    right: 50%;
    margin-left: 5px;
    border-width: -5px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.75) transparent transparent transparent;
  }
</style>
