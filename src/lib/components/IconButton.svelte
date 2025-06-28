<script lang="ts">
    import { onMount } from "svelte";
    export let onClick: (() => void) | undefined = undefined;
    export let appearance: "subtle" | "primary" | "warning" | "danger" | "discover" = "subtle";
    export let icon: string;
    export let alt: string;

    let hovered = false;

    function handleClick() {
        if (onClick) onClick();
    }
</script>

<button
    class={appearance}
    on:click={handleClick}
    on:mouseenter={() => (hovered = true)}
    on:mouseleave={() => (hovered = false)}
    aria-label={alt}
>
    <span class="icon icon-before material-symbols-outlined" aria-hidden="true">{icon}</span>

    {#if hovered}
        <div class="tooltip">{alt}</div>
    {/if}
</button>

<style>
    button {
        position: relative; /* Needed for absolute tooltip positioning */
        font-size: 1rem;
        text-decoration: none;
        display: inline-flex;
        gap: 0.2rem;
        padding: 0.6em 1em;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition:
            background-color 200ms ease,
            color 200ms ease;
    }

    .icon {
      font-size: 1rem;
    }

    /* Tooltip styling */
    .tooltip {
        position: absolute;
        bottom: -2.4em; /* Place below the button */
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

    /* Add a small arrow below the tooltip */
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

    /* Your existing appearance, hover, and active styles here ... */
</style>
