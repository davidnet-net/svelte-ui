<script lang="ts">
    export let direction: "column" | "row" | "column-reverse" | "row-reverse" = "column";
    export let gap: string | undefined = "0px;";
    export let height: string | undefined = "fit-content";
    export let width: string | undefined = "fit-content";
    export let justifycontent: string | undefined = "center"
    export let alignitems: string | undefined = "center"
</script>

<div style="flex-direction: {direction}; gap: {gap}; height: {height}; width: {width} justify-content: {justifycontent} align-items: {alignitems}">
    <slot/>
</div>

<style>
    div {
        display: flex;
    }
</style>