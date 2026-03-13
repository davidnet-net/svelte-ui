<script lang="ts">
	import { Flex } from "$lib";
	import Card from "$lib/internal/components/Card/Card.svelte";
	import Header from "$lib/internal/components/Header/Header.svelte";
	import NavigationData from "$lib/internal/components/NavigationData.svelte";

	import { styles } from "./page.css.ts";

	const { data } = $props();

	const formatFileSize = (bytes: number): string => {
		if (bytes === 0) return "0 B";
		const k = 1024;
		const sizes = ["B", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));

		const unitValue = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
		return `${unitValue} ${sizes[i]}`;
	};

	const externalContextFiles = $derived(data.externalContextFiles);
	const internalContextFiles = $derived(data.internalContextFiles);
	const instructionFiles = $derived(data.instructionFiles);
</script>

<NavigationData />
<Header heading="LLM Resources" paragraph="Let AI write code that fits with our system design." />
<div class={styles.pageContainer}>
	<h2>LLM external system context files</h2>
	<Flex direction="row" gap="medium" marginTop="medium" marginBottom="medium" overflowX="auto">
		{#each externalContextFiles as file (file.name)}
			<Card
				href="/downloads/llm-external-context/{file.name}"
				title={file.name}
				icon="files"
				description={formatFileSize(file.size)}
				download={file.name} />
		{/each}
	</Flex>
	<h2>LLM internal system context files</h2>
	<Flex direction="row" gap="medium" marginTop="medium" marginBottom="medium" overflowX="auto">
		{#each internalContextFiles as file (file.name)}
			<Card
				href="/downloads/llm-internal-context/{file.name}"
				title={file.name}
				icon="files"
				description={formatFileSize(file.size)}
				download={file.name} />
		{/each}
	</Flex>
	<h2>Prebuild AI agents</h2>
	<Flex direction="row" gap="medium" marginTop="medium" marginBottom="medium" overflowX="auto">
		<Card
			href="https://gemini.google.com/gem/1DSFaT-ND0ga3H7pNEnVXYqKFrMlID3ai?usp=sharing"
			title="Gemini GEM"
			icon="robot_2"
			external
			description="Gemini gem that already contains all the System Context files and custom instructions." />
	</Flex>
	<h2>Custom instructions</h2>
	<Flex direction="row" gap="medium" marginTop="medium" marginBottom="medium" overflowX="auto">
		{#each instructionFiles as file (file.name)}
			<Card
				href="/downloads/llm-custom-instructions/{file.name}"
				title={file.name}
				icon="files"
				description={formatFileSize(file.size)}
				download={file.name} />
		{/each}
	</Flex>
</div>
