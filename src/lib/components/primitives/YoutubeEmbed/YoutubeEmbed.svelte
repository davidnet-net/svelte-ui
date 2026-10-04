<script lang="ts">
	import { styles } from "./YoutubeEmbed.css";

	interface Props {
		/** Full youtube.com/watch, youtu.be, youtube.com/embed URL, or a bare 11-char video ID. */
		url: string;
		autoplay?: boolean;
		/** Bindable — browsers block unmuted autoplay without a user gesture on this screen,
		 *  so this should start `true` whenever `autoplay` is set. A consumer-side unmute
		 *  button can flip it; the embed relays the change to the player without reloading. */
		muted?: boolean;
		title?: string;
	}

	let { url, autoplay = false, muted = $bindable(autoplay), title = "YouTube video" }: Props = $props();

	function extractVideoId(input: string): string | null {
		const trimmed = input.trim();
		const idPattern = /^[A-Za-z0-9_-]{11}$/;
		if (idPattern.test(trimmed)) return trimmed;

		try {
			const parsed = new URL(trimmed);
			if (parsed.hostname === "youtu.be") {
				const id = parsed.pathname.slice(1);
				return idPattern.test(id) ? id : null;
			}
			if (parsed.hostname.endsWith("youtube.com")) {
				const vParam = parsed.searchParams.get("v");
				if (vParam && idPattern.test(vParam)) return vParam;
				const embedMatch = parsed.pathname.match(/\/embed\/([A-Za-z0-9_-]{11})/);
				if (embedMatch) return embedMatch[1];
			}
		} catch {
			return null;
		}
		return null;
	}

	const videoId = $derived(extractVideoId(url));

	const src = $derived(
		videoId
			? `https://www.youtube.com/embed/${videoId}?enablejsapi=1&playsinline=1&rel=0&autoplay=${autoplay ? 1 : 0}&mute=${muted ? 1 : 0}`
			: undefined
	);

	let iframeElement: HTMLIFrameElement | undefined = $state();
	let ready = $state(false);

	function postCommand(func: "mute" | "unMute") {
		iframeElement?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args: [] }), "*");
	}

	$effect(() => {
		if (!ready) return;
		postCommand(muted ? "mute" : "unMute");
	});
</script>

<div class={styles.wrapper}>
	{#if src}
		<iframe
			bind:this={iframeElement}
			class={styles.frame}
			{src}
			{title}
			allow="autoplay; encrypted-media"
			allowfullscreen
			onload={() => (ready = true)}>
		</iframe>
	{/if}
</div>
