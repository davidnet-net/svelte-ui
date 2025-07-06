<script lang="ts">
    // <Center x y></Center> Can do x y directly in it without values due booleans
    export let x: boolean = true;
    export let y: boolean = true;
</script>

<div>
    <slot/>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
    }
</style>

{#if x}
    <style>
        div {
            justify-content: center;
        }
    </style>
{/if}

{#if y}
    <style>
        div {
            align-items: center;
        }
    </style>
{/if}