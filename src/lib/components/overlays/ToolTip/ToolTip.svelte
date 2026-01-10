<script lang="ts">
	import { onMount, tick } from "svelte";

	import { styles } from "./ToolTip.css.ts";

	let tooltipElement: HTMLDivElement | undefined = $state();
	let nudgeX = $state(0);

	async function adjustPositionOnce() {
		await tick();

		if (!tooltipElement) return;

		const rect = tooltipElement.getBoundingClientRect();
		const viewportWidth = window.innerWidth;

		if (rect.left < 0) {
			nudgeX = -rect.left + 8;
		} else if (rect.right > viewportWidth) {
			nudgeX = viewportWidth - rect.right - 8;
		} else {
			nudgeX = 0;
		}
	}

	interface Props {
		tip: string;
	}

	let { tip }: Props = $props();

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
	class={styles.baseToolTip}
>
	{tip}
</div>
