<script lang="ts">
	import { onMount, tick } from "svelte";

	import KeyboardTip from "$lib/components/messaging/KeyboardTip/KeyboardTip.svelte";

	import { styles } from "./ToolTip.css";

	let tooltipElement: HTMLDivElement | undefined = $state();
	let nudgeX = $state(0);

	async function adjustPositionOnce() {
		await tick();
		if (!tooltipElement) return;

		requestAnimationFrame(() => {
			const rect = tooltipElement!.getBoundingClientRect();
			const viewportWidth = window.innerWidth;

			let nextNudge = 0;
			if (rect.left < 0) {
				nextNudge = -rect.left + 8;
			} else if (rect.right > viewportWidth) {
				nextNudge = viewportWidth - rect.right - 8;
			}

			if (nudgeX !== nextNudge) {
				nudgeX = nextNudge;
			}
		});
	}

	interface Props {
		tip: string;
		keyboardTip?: string[];
	}

	let { tip, keyboardTip = [] }: Props = $props();

	onMount(() => {
		adjustPositionOnce();
	});

	$effect(() => {
		if (tip) {
			adjustPositionOnce();
		}
	});
</script>

<div
	style="transform: translateX(calc(-50% + {nudgeX}px)); --arrow-offset: {nudgeX}px;"
	bind:this={tooltipElement}
	class={styles.baseToolTip}>
	<div>{tip}</div>
	{#if keyboardTip.length > 0}
		<KeyboardTip {keyboardTip} />
	{/if}
</div>
