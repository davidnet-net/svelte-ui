<script lang="ts">
  export let gap: string = "0px;";
</script>

<div style="gap: {gap}"><slot /></div>

<style>
  div {
    display: flex;
    justify-content: center;
    width: 100%;
  }
</style>
