<span class="loader"></span>

<style>
    .loader {
        width: 15px;
        height: 15px;
        border: 2px solid var(--token-color-text-default-normal);
        border-bottom-color: transparent;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
