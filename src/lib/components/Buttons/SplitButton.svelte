<script lang="ts">
	import Button from './Button.svelte';

	export let label: string;
	export let appearance: "subtle" | "primary" | "warning" | "danger" | "discover" = "subtle";
	export let iconbefore: string | undefined = undefined;
	export let actions: { label: string; onClick: () => void }[] = [];

	let open = false;
	let container: HTMLDivElement;

	function toggle() {
		open = !open;
	}

	function close() {
		open = false;
	}
</script>

<div class="split-button" bind:this={container} use:onclck={close}>
	<Button {appearance} {iconbefore} on:click={() => actions[0]?.onClick()}>
		{label}
	</Button>
	<Button
		appearance={appearance}
		iconafter="arrow_drop_down"
		on:click={toggle}
		aria-haspopup="menu"
		aria-expanded={open}
	/>

	{#if open}
		<ul class="menu" role="menu">
			{#each actions.slice(1) as action}
				<li role="menuitem" on:click={() => { action.onClick(); close(); }}>
					{action.label}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.split-button {
		position: relative;
		display: inline-flex;
	}

	.menu {
		position: absolute;
		top: 100%;
		right: 0;
		margin-top: 0.2rem;
		background: var(--token-color-background-subtle-normal);
		border: 1px solid var(--token-color-border-default-normal);
		border-radius: 4px;
		min-width: 100%;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		z-index: 1000;
		padding: 0.2rem 0;
		list-style: none;
	}

	.menu li {
		padding: 0.4rem 0.8rem;
		cursor: pointer;
		white-space: nowrap;
		color: var(--token-color-text-default-normal);
	}

	.menu li:hover {
		background-color: var(--token-color-background-subtle-hover);
	}
</style>
