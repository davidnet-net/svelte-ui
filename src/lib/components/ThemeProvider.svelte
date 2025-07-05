<script lang="ts">
	import { onMount } from 'svelte';

	function LoadFonts() {
		const remoteUrl = "https://design.davidnet.net/fonts/fonts.css";
		const localUrl = "/fonts/fonts.css";

		let link = document.getElementById("fonts-css") as HTMLLinkElement | null;
		if (link) link.remove();

		link = document.createElement("link");
		link.id = "fonts-css";
		link.rel = "stylesheet";
		link.href = remoteUrl;

		link.onerror = () => {
			console.warn("Falling back to local fonts.");
			link.remove();

			const fallback = document.createElement("link");
			fallback.id = "fonts-css";
			fallback.rel = "stylesheet";
			fallback.href = localUrl;
			document.head.appendChild(fallback);
		};

		document.head.appendChild(link);
	}

	onMount(() => {
		LoadFonts();
	});
</script>
