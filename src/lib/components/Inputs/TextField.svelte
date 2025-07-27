<script lang="ts">
	export let id: string = "input-" + Math.random().toString(36).substring(2, 8);
	export let label: string;
	export let placeholder: string;
	export let type: "text" | "email" | "password" | "url" | "search" = "text";
	export let value: string = "";
	export let disabled: boolean = false;
	export let invalid: boolean = false;
	export let invalidMessage: string = "Invalid";
	export let onEnter: (event: KeyboardEvent) => void = () => {};
</script>

<div class="input-root">
	<label for={id}>{label}</label>
	<input
		{id}
		{type}
		{placeholder}
		{disabled}
		bind:value
		aria-invalid={invalid}
		aria-describedby={invalid ? id + "-error" : undefined}
		on:keypress={(event) => {
			if (event.key === "Enter" && onEnter) {
				onEnter(event);
			}
		}}
	/>
	{#if invalid}
		<div id={id + "-error"} class="error-message">
			<p>
				<span class="material-symbols-outlined" aria-hidden="true">error</span>
				{invalidMessage}
			</p>
		</div>
	{/if}
</div>

<style>
	.input-root {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	label {
		font-size: 0.875rem;
		font-weight: 500;
	}

	input {
		all: unset;
		border-radius: 8px;
		cursor: text;
		padding: 0.5rem;
		font-family: var(--token-font-main);
		background-color: var(--token-color-surface-raised-normal);
	}

	.error-message {
		color: var(--token-color-text-danger);
	}

	p {
		font-size: 1rem;
		vertical-align: middle;
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	span {
		font-size: 1.2rem;
	}
</style>
