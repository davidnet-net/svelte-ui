<script lang="ts">
	import Skeleton from "$lib/components/loading/Skeleton/Skeleton.svelte";
	import { Link } from "$lib/components/navigation";
	import ToolTip from "$lib/components/overlays/ToolTip/ToolTip.svelte";
	import Anchor from "$lib/components/primitives/Anchor/Anchor.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";

	import * as styles from "./Changelog.css";

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

	let hoveredHash = $state<string | null>(null);
</script>

<div class="changelog">
	{#if loading}
		<Flex direction="column" gap="small" width="80%">
			<Skeleton height="1.5rem" width="100%" radius="full" />
			<Skeleton height="1.5rem" width="100%" radius="full" />
			<Skeleton height="1.5rem" width="100%" radius="full" />
			<Skeleton height="1.5rem" width="100%" radius="full" />
			<Skeleton height="1.5rem" width="100%" radius="full" />
		</Flex>
	{:else}
		<Flex direction="column" gap="small">
			{#each history as commit (commit.h)}
				{#if commit.s.length > 0}
					<Flex>
						<Anchor
							external
							opennewtab
							href="{repoUrl}/commit/{commit.h}"
							onmouseenter={() => {
								hoveredHash = commit.h;
							}}
							onmouseleave={() => {
								hoveredHash = null;
							}}>
							<div class={styles.hashContainer}>
								<Link external opennewtab href="{repoUrl}/commit/{commit.h}">
									{commit.h.slice(0, 7)}
									{#if hoveredHash === commit.h}
										<ToolTip tip={new Date(commit.d).toUTCString()} />
									{/if}
								</Link>
							</div>
						</Anchor>
						{commit.s}
					</Flex>
				{/if}
			{/each}
		</Flex>
	{/if}
</div>
