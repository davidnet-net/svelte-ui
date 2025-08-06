<script lang="ts">
	export let src: string;
	export let alt: string;
	export let title: string;
	export let description: string;
	export let href: string | undefined = undefined;
	export let imageheight: string = "125px";
	export let imagewidth: string = "100px;"
</script>

{#if href}
	<a {href}>
		<div class="card">
			<div class="card-image-wrapper">
				<img class="card-image" {src} {alt} width={imagewidth} height="={imageheight}"/>
			</div>

			<div class="card-content">
				<h3 class="card-title">{title}</h3>
				<p class="card-description">{description}</p>
			</div>
		</div>
	</a>
{:else}
	<div class="card">
		<div class="card-image-wrapper">
			<img class="card-image" {src} {alt} />
		</div>

		<div class="card-content">
			<h3 class="card-title">{title}</h3>
			<p class="card-description">{description}</p>
		</div>
	</div>
{/if}

<style>
	a {
		display: inline-block;
		text-decoration: none;
	}

	.card {
		display: flex;
		flex-direction: column;
		width: 200px;
		min-height: 250px;
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
		flex: 0 0 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--token-color-surface-default-hover);
	}

	.card-image {
		min-width: 100px;
		min-height: 125px;
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		display: block;
	}

	.card-content {
		flex: 0 0 50%;
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
		font-size: 0.90rem;
		line-height: 1.1;
		color: var(--token-color-text-default-secondary);
	}
</style>
