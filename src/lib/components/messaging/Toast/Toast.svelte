<script lang="ts">
	import { cubicOut } from "svelte/easing";
	import { fly } from "svelte/transition";

	import IconButton from "$lib/components/input/IconButton/IconButton.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import Icon from "$lib/components/primitives/Icon/Icon.svelte";
	import type { ToastItem } from "$lib/engines/toastEngine.svelte";

	import { styles } from "./Toast.css";

	interface Props {
		toast: ToastItem;
	}

	let { toast }: Props = $props();
	let flyParams = {
		x: 0,
		y: 20,
		duration: 300,
		easing: cubicOut
	};
</script>

<div
	aria-live={toast.appearance === "danger" || toast.appearance === "warning"
		? "assertive"
		: "polite"}
	in:fly={flyParams}
	out:fly={flyParams}
	class="{styles.baseToast} {styles.appearance[toast.appearance ?? 'primary']}">
	<Flex direction="row" gap="xsmall" alignItems="start" justifyContent="center">
		{#if toast.icon}
			<Flex height="32px" width="fit-content" justifyContent="center" alignItems="center">
				<Icon size="inherit" icon={toast.icon} />
			</Flex>
		{/if}

		<Flex direction="column" gap="xsmall" flexGrow="1">
			<Flex alignItems="center" justifyContent="spaceBetween" direction="row">
				<span class={styles.title}>{toast.title}</span>
				<IconButton
					icon="close"
					onclick={() => {
						toast.dismiss();
					}}
					tip="" />
			</Flex>

			{#if toast.appearance}
				<div class={styles.appearance[toast.appearance]}>
					{toast.content}
				</div>
			{/if}
		</Flex>
	</Flex>
</div>
