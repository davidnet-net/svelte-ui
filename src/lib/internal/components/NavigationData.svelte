<script lang="ts">
	import { getCurrentPage } from "$lib/internal/navigationData.svelte";
	const navigationPageData = getCurrentPage();
</script>

<svelte:head>
	<title>{navigationPageData.title}</title>
	<meta name="description" content={navigationPageData.description} />
	<link rel="canonical" href={navigationPageData.fullUrl} />

	<meta property="og:type" content={navigationPageData.ogType} />
	<meta property="og:url" content={navigationPageData.fullUrl} />
	<meta property="og:title" content={navigationPageData.title} />
	<meta property="og:description" content={navigationPageData.description} />
	<meta property="og:image" content={navigationPageData.ogImage} />
</svelte:head>
