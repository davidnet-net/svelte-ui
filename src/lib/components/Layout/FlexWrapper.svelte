<script lang="ts">
    export let direction: "column" | "row" | "column-reverse" | "row-reverse" = "column";
    export let gap: string | undefined = "0px;";
    export let height: string | undefined = "fit-content";
    export let width: string | undefined = "fit-content";
</script>

<div style="flex-direction: {direction}; gap: {gap}; height: {height}; width: {width}">
    <slot/>
</div>

<style>
    div {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>