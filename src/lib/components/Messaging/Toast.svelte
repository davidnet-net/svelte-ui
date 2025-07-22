<script lang="ts">
	import { fly } from "svelte/transition";
	import { cubicOut } from "svelte/easing";

	export let title: string;
	export let desc: string | null = null;
	export let icon: string | null = null;
	export let appearance: "info" | "warning" | "danger" | "discover" | "success" | "primary" = "info";
	export let autoDismiss: number | null = null;
	export let onClose: () => void;
	export let position: string = "bottom-right";

	let timeout: ReturnType<typeof setTimeout>;

	if (autoDismiss) {
		timeout = setTimeout(() => {
			onClose();
		}, autoDismiss);
	}

	function close() {
		if (timeout) clearTimeout(timeout);
		onClose();
	}

	// Determine fly direction based on position
	let flyParams = { x: 0, y: 20, duration: 300, easing: cubicOut };

	if (position.includes("right")) flyParams.x = 100;
	else if (position.includes("left")) flyParams.x = -100;
	else flyParams.x = 0;

	if (position.includes("top")) flyParams.y = -20;
	else if (position.includes("bottom")) flyParams.y = 20;
</script>

<div class="toast {appearance}" in:fly={flyParams} out:fly={flyParams}>
	{#if icon}
		<span class="material-symbols-outlined icon" aria-hidden="true">{icon}</span>
	{/if}
	<div class="content">
		<div class="title">{title}</div>
		{#if desc}
			<div class="desc">
				{#each desc.split("\n") as line, i (i)}
					{line}{#if i < desc.split("\n").length - 1}<br />{/if}
				{/each}
			</div>
		{/if}
	</div>
	<button aria-label="Close toast" class="close-btn" on:click={close}>×</button>
	<!--×-->
</div>

<style>
	.toast {
		display: flex;
		align-items: flex-start;
		background-color: var(--token-color-surface-overlay-normal);
		color: var(--token-color-text-default);
		border-radius: 4px;
		padding: 0.75rem 1rem;
		box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
		min-width: 280px;
		max-width: 360px;
		position: relative;
		pointer-events: auto;
	}
	.toast.info {
		background-color: var(--token-color-background-information-normal);
		color: var(--token-color-text-light-normal);
	}
	.toast.warning {
		background-color: var(--token-color-background-warning-normal);
		color: var(--token-color-text-light-normal);
	}
	.toast.danger {
		background-color: var(--token-color-background-danger-normal);
		color: var(--token-color-text-default);
	}
	.toast.discover {
		background-color: var(--token-color-background-discover-normal);
		color: var(--token-color-text-default);
	}
	.toast.success {
		background-color: var(--token-color-background-success-normal);
		color: var(--token-color-text-light-normal);
	}
	.toast.primary {
		background-color: var(--token-color-background-primary-normal);
		color: var(--token-color-text-default);
	}

	.icon {
		margin-right: 0.75rem;
		font-size: 1.4rem;
		flex-shrink: 0;
	}

	.content {
		flex: 1;
	}

	.title {
		font-weight: 600;
		margin-bottom: 0.15rem;
	}

	.desc {
		font-size: 0.875rem;
		color: var(--token-color-text-light-normal);
	}

	.toast.discover .desc {
		color: var(--token-color-text-default);
	}

	.toast.primary .desc {
		color: var(--token-color-text-default);
	}

	.toast.danger .desc {
		color: var(--token-color-text-default);
	}

	.close-btn {
		position: absolute;
		top: 0.3rem;
		right: 0.4rem;
		cursor: pointer;
		background: transparent;
		border: none;
		font-size: 1.1rem;
		color: inherit;
		padding: 0;
		line-height: 1;
		font-size: 1.5rem;
	}
	.close-btn:hover {
		color: var(--token-color-text-danger);
	}
</style>
