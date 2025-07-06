<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { browser } from "$app/environment";
    import { toast } from "$lib/stores/toasts.js";

    export let onoffline: Function | undefined = undefined;
    export let ononline: Function | undefined = undefined;
    export let showtoasts: boolean | undefined = true;

    function handleOffline() {
        if (onoffline) {
            onoffline();
        }

        if (!showtoasts) return;
        toast({
            title: "Offline",
            desc: "You have lost internet connection. \n Not all functionality is available.",
            icon: "cloud_alert",
            appearance: "danger",
            position: "bottom-left",
        });
    }

    function handleOnline() {
        if (ononline) {
            ononline();
        }

        if (!showtoasts) return;
        toast({
            title: "Back Online",
            desc: "Your internet connection is restored.",
            icon: "cloud_done",
            appearance: "success",
            position: "bottom-left",
        });
    }

    onMount(() => {
        if (!browser) return;

        window.addEventListener("offline", handleOffline);
        window.addEventListener("online", handleOnline);
    });

    onDestroy(() => {
        if (!browser) return;

        window.removeEventListener("offline", handleOffline);
        window.removeEventListener("online", handleOnline);
    });
</script>
