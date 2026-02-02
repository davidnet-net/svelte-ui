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
	<Flex direction="column" gap="xsmall" justifyContent="start" alignItems="start">
		<Flex alignItems="center" justifyContent="spaceBetween" direction="row" gap="xsmall">
			<Flex alignItems="center" direction="row" gap="xsmall">
				{#if toast.icon}
					<Icon icon={toast.icon} />
				{/if}
				<span class={styles.title}>{toast.title}</span>
			</Flex>
			<IconButton
				icon="close"
				onclick={() => {
					toast.dismiss();
				}}
				tip="" />
		</Flex>
		{toast.content}
	</Flex>
</div>
