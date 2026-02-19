<script lang="ts">
	import { fade } from "svelte/transition";

	import Skeleton from "$lib/components/loading/Skeleton/Skeleton.svelte";
	import { focusring } from "$lib/styles/global.css";

	import Anchor from "../Anchor/Anchor.svelte";
	import { styles } from "./Avatar.css";

	interface Props {
		size: keyof typeof styles.size;
		src: string;
		onclick?: (event: MouseEvent) => void;
		loading?: boolean;
		href?: string;
		opennewtab?: boolean;
		external?: boolean;
		alt?: string;
		decorative?: boolean;
	}

	let {
		size,
		src,
		onclick = undefined,
		loading = false,
		href = "",
		opennewtab = false,
		external = false,
		alt = "",
		decorative = false
	}: Props = $props();

	let imageLoaded = $state(false);
	let isLoading = $derived(loading || !imageLoaded);

	// If it's a link or a button, it needs a label.
	// If decorative is true, we explicitly hide it.
	let accessibleName = $derived(decorative ? "" : alt || "Profile picture");

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
{:else if href}
	<Anchor {href} {external} {opennewtab} aria-label={accessibleName}>
		<img
			in:fade={{ duration: 300 }}
			class="{styles.baseAvatar} {focusring} {styles.size[size]} {styles.clickable}"
			aria-hidden="true"
			alt=""
			{src} />
	</Anchor>
{:else if onclick}
	<button
		type="button"
		class="{styles.buttonreset} {styles.size[size]}"
		{onclick}
		aria-label={accessibleName}>
		<img
			in:fade={{ duration: 300 }}
			class="{styles.baseAvatar} {focusring} {styles.size[size]} {styles.clickable}"
			aria-hidden="true"
			alt=""
			{src} />
	</button>
{:else}
	<img
		in:fade={{ duration: 300 }}
		class="{styles.baseAvatar} {styles.size[size]}"
		aria-hidden={decorative ? "true" : undefined}
		alt={accessibleName}
		{src} />
{/if}
