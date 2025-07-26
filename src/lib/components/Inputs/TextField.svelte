<script lang="ts">
	export let placeholder: string = "Your name";
	export let type: "text" | "email" | "password" | "url" = "text";
	export let value: string = "";
	export let disabled: boolean = false;
	export let invalid: boolean = false;
</script>

<div id="root">
	<input {type} {placeholder} {disabled} bind:value />
	{#if invalid}
		<div id="message">
			<p><span class="material-symbols-outlined dropdown-arrow" aria-hidden="true">error</span> Invalid</p>
		</div>
	{/if}
</div>

<style>
	#root {
		display: flex;
		flex-direction: column;
		gap: 0px;
	}

	input {
		all: unset;
		border-radius: 8px;
		cursor: text;
		padding: 0.5rem;
		font-family: var(--token-font-main);
		background-color: var(--token-color-surface-sunken-normal);
	}

	#message {
		color: var(--token-color-text-danger);
	}

	p {
		font-size: 1rem;
		vertical-align: middle;
	}

	span {
		font-size: 1.2rem;
		vertical-align: middle;
	}
</style>
