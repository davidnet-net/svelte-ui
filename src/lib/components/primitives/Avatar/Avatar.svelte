<script lang="ts">
	import { fade } from "svelte/transition";

	import Skeleton from "$lib/components/loading/Skeleton/Skeleton.svelte";

	import Anchor from "../Anchor/Anchor.svelte";
	import { styles } from "./Avatar.css";

	interface Props {
		size: keyof typeof styles.size;
		onclick?: (event: MouseEvent) => void;
		loading?: boolean;
		src: string;
		href?: string;
		opennewtab?: boolean;
		external?: boolean;
	}

	let {
		size,
		onclick = undefined,
		loading = false,
		src,
		href = "",
		opennewtab = false,
		external = false
	}: Props = $props();

	let imageLoaded = $state(false);
	let isLoading = $derived(loading || !imageLoaded);

	$effect(() => {
		const img = new Image();
		img.src = src;

		if (img.complete) {
			imageLoaded = true;
		} else {
			img.onload = () => {
				imageLoaded = true;
			};
		}
	});
</script>

{#if isLoading}
	<Skeleton class="{styles.size[size]} {styles.baseAvatar}" noDefaults />
{:else if !href}
	<img
		in:fade={{ duration: 300 }}
		class="{styles.baseAvatar} {styles.size[size]} {onclick ? styles.clickable : ''}"
		aria-hidden="true"
		{onclick}
		alt="Profile picture"
		{src} />
{:else}
	<Anchor {href} {external} {opennewtab}>
		<img
			in:fade={{ duration: 300 }}
			class="{styles.baseAvatar} {styles.size[size]} {styles.clickable}"
			aria-hidden="true"
			alt="Profile picture"
			{src} />
	</Anchor>
{/if}
