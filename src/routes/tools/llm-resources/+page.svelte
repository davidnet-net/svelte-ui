<script lang="ts">
	import { Flex } from "$lib";
	import Card from "$lib/internal/components/Card/Card.svelte";
	import Header from "$lib/internal/components/Header/Header.svelte";
	import NavigationData from "$lib/internal/components/NavigationData.svelte";
	import * as m from "$lib/paraglide/messages.js";

	import { styles } from "./page.css";

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
<Header
	heading={m.docs_page_llm_resources_header_heading()}
	paragraph={m.docs_page_llm_resources_header_paragraph()} />
<div class={styles.pageContainer}>
	<h2>{m.docs_page_llm_resources_subheading_external_context_files()}</h2>
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
	<h2>{m.docs_page_llm_resources_subheading_internal_context_files()}</h2>
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
	<h2>{m.docs_page_llm_resources_subheading_prebuild_agents()}</h2>
	<Flex direction="row" gap="medium" marginTop="medium" marginBottom="medium" overflowX="auto">
		<Card
			href="https://gemini.google.com/gem/1DSFaT-ND0ga3H7pNEnVXYqKFrMlID3ai?usp=sharing"
			title={m.docs_page_llm_resources_card_gemini_gem_title()}
			icon="robot_2"
			external
			description={m.docs_page_llm_resources_card_gemini_gem_description()} />
	</Flex>
	<h2>{m.docs_page_llm_resources_subheading_custom_instructions()}</h2>
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
