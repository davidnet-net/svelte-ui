<script lang="ts">
	import { flip } from "svelte/animate";
	import { fly } from "svelte/transition";

	import Toast from "$lib/components/messaging/Toast/Toast.svelte";
	import { getToasts } from "$lib/engines/toastEngine.svelte";

	import { styles } from "./Toaster.css";

	const toasts = getToasts();

	const locations = Object.keys(styles.toastLocation) as (keyof typeof styles.toastLocation)[];
</script>

<div class={styles.baseToaster}>
	{#each locations as location (location)}
		<div class={styles.toastLocation[location]}>
			{#each toasts.filter((t) => t.location === location) as toast (toast.id)}
				<div
					animate:flip={{ duration: 300 }}
					in:fly={{ y: 20, duration: 300 }}
					out:fly={{ y: 20, duration: 300 }}
					style="pointer-events: auto;">
					<Toast {toast} />
				</div>
			{/each}
		</div>
	{/each}
</div>
