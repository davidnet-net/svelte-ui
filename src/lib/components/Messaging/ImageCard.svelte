<script lang="ts">
	export let src: string;
	export let alt: string;
	export let title: string;
	export let description: string;
</script>

<div class="card">
	<div class="card-image-wrapper">
		<img class="card-image" {src} {alt} />
	</div>

	<div class="card-content">
		<h3 class="card-title">{title}</h3>
		<p class="card-description">{description}</p>
	</div>
</div>

<style>
	.card {
		display: flex;
		flex-direction: column;
		width: 300px;
		min-height: 300px;
        height: fit-content;
		background: var(--token-color-surface-raised-normal);
		border-radius: var(--token-space-2);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        border: 1px solid var(--token-color-text-default-tertiary);
		overflow: hidden;
	}

    .card:hover {
        border-color: var(--token-color-text-default-normal);
    }

	.card-image-wrapper {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--token-color-surface-default-hover);
	}

	.card-image {
		max-width: 75%;
		max-height: 75%;
		object-fit: contain;
	}

	.card-content {
		flex: 1;
		padding: var(--token-space-4);
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: var(--token-color-text-default-normal);
		background-color: var(--token-color-surface-default-raised);
	}

	.card-title {
		margin: 0;
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--token-color-text-default-normal);
		font-family: var(--token-font-heading);
	}

	.card-description {
		margin-top: var(--token-space-2);
		font-size: 0.95rem;
		color: var(--token-color-text-default-secondary);
	}
</style>
