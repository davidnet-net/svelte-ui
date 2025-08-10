<script lang="ts">
    import { Icon } from "$lib/index.js";

    export let id = "";
</script>

<div class="avatar">
    {#if id === ""}
        <Icon icon="account_circle"/>
    {:else}
        <Icon icon="mood_bad"/>
    {/if}
</div>

<style>
    .avatar {
        margin: 0rem var(--token-space-2);
    }
</style>