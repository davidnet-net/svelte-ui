<script lang="ts">
	import LinkButton from "$lib/components/input/LinkButton/LinkButton.svelte";

	interface Commit {
		h: string;
		s: string;
		d: string;
	}

	interface Props {
		gitpath: string;
		repoUrl: string;
	}

	const { gitpath, repoUrl }: Props = $props();

	let history = $state<Commit[]>([]);
	let loading = $state(true);

	// Fetch data on mount
	$effect(() => {
		fetch(`/api/changelog?file=${encodeURIComponent(gitpath)}`)
			.then((res) => res.json())
			.then((data) => {
				history = data;
				loading = false;
			});
	});
</script>

<div class="changelog">
	{#if loading}
		<p>Loading history...</p>
	{:else}
		{#each history as commit (commit.h)}
			{#if commit.s.length > 0}
				<div class="item">
					<span></span>
					<LinkButton href="{repoUrl}/commit/{commit.h}" appearance="subtle" external opennewtab>
						{commit.d} |
						{commit.s}
					</LinkButton>
				</div>
			{/if}
		{/each}
	{/if}
</div>
