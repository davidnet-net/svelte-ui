<script lang="ts">
    export let text: string;
</script>

<div class="tooltip" role="tooltip">
    {text}
</div>

<style>
.tooltip {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 10px;
    background-color: var(--token-color-surface-inverse-raised-normal);
    color: var(--token-color-text-inverse-normal);
    padding: 0.25em 0.5em;
    font-size: 0.75rem;
    border-radius: 3px;
    white-space: nowrap;
    pointer-events: none;
    user-select: none;
    z-index: 10;
    box-sizing: border-box;
    line-height: 1;
}

/* Arrow with tip facing UP */
.tooltip::after {
    content: "";
    position: absolute;
    bottom: 100%; /* position arrow just above tooltip */
    left: 50%;
    transform: translateX(-50%);
    border-width: 0 6px 6px 6px; /* height 6px pointing up */
    border-style: solid;
    border-color: transparent transparent var(--token-color-surface-inverse-raised-normal) transparent;
}

</style>
