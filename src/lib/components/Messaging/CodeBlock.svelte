<script lang="ts">
    import { IconButton, toast } from "$lib/index.js";
    import { browser } from "$app/environment";
    import { tick } from "svelte";

    export let code: string;
    export let language: string = "plaintext";

    let copied = false;

    async function copyToClipboard() {
        if (!browser) return;

        try {
            await navigator.clipboard.writeText(code);
            copied = true;
            await tick();
            toast({
                title: "Copied!",
                icon: "content_copy",
                appearance: "success",
                position: "bottom-left",
                autoDismiss: 2000
            });
            setTimeout(() => {
                copied = false;
            }, 1500);
        } catch (err) {
            toast({
                title: "Copy failed!",
                desc: "We couldn't access your clipboard.",
                icon: "content_copy",
                appearance: "danger",
                position: "bottom-left",
                autoDismiss: 5000
            });
        }
    }
</script>

<div class="codeblock">
    <IconButton
        icon={copied ? "check" : "content_copy"}
        alt={copied ? "Copied!" : "Copy code to clipboard"}
        appearance="subtle"
        onClick={copyToClipboard}
        disabletooltip
    />
    <pre><code class={"language-" + language}>{code}</code></pre>
</div>

<style>
    .codeblock {
        position: relative;
        background-color: var(--token-color-surface-sunken-normal);
        border-radius: 5px;
        padding: var(--token-space-4);
        font-size: 0.875rem;
        padding-right: 3rem;
        overflow-x: auto;
        width: fit-content;
        font-family: var(--token-font-mono, monospace);
    }

    .codeblock :global(pre) {
        margin: 0;
    }

    .codeblock :global(code) {
        white-space: pre-wrap;
        word-break: break-word;
        display: block;
    }

    .codeblock :global(button) {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
    }
</style>
