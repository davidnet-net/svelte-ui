<script lang="ts">
	import { Divider } from "$lib";
	import Anchor from "$lib/components/primitives/Anchor/Anchor.svelte";
	import CodeSnippet from "$lib/components/primitives/CodeSnippet/CodeSnippet.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import Changelog from "$lib/internal/components/Changelog/Changelog.svelte";
	import Header from "$lib/internal/components/Header/Header.svelte";
	import * as m from "$lib/paraglide/messages.js";
	import { token } from "$lib/styles";

	import * as styles from "./page.css";
	// Import the sample txt file using Vite's ?raw query
	import sampleCode from "./sample.txt?raw";

	const inlineCode = `const greeting = "Hello, Svelte 5!";
console.log(greeting);

function greet(user: string): string {
	return \`\${greeting} Greeted \${user}.\`;
}`;
</script>

<Header heading={m.docs_page_name_codesnippet()} paragraph={m.docs_page_codesnippet_description()} />

<div class={styles.pageContainer}>
	<h2>{m.docs_page_codesnippet_s1_heading()}</h2>
	<p class={styles.paragraph}>
		{m.docs_page_codesnippet_s1_desc_prefix()} <code>code</code>
		(or
		<code>codeSnippet</code>
		) {m.docs_page_codesnippet_s1_desc_suffix()}
	</p>
	<div class={styles.showcaseContainer}>
		<div class={styles.showcase}>
			<CodeSnippet code={inlineCode} language="typescript" />
		</div>
	</div>

	<h2>{m.docs_page_codesnippet_s2_heading()}</h2>
	<p class={styles.paragraph}>
		{m.docs_page_codesnippet_s2_desc_prefix()} <code> ?raw </code>
		{m.docs_page_codesnippet_s2_desc_suffix()}
		<code>import mySnippet from "./file.txt?raw"</code>
		.
	</p>
	<div class={styles.showcaseContainer}>
		<div class={styles.showcase}>
			<CodeSnippet code={sampleCode} language="typescript" filename="Svelte5Example.svelte.ts" />
		</div>
	</div>

	<h2>{m.docs_page_codesnippet_s3_heading()}</h2>
	<p class={styles.paragraph}>
		{m.docs_page_codesnippet_s3_desc_prefix()} <code>showLineNumbers</code>
		{m.docs_page_codesnippet_s3_desc_mid()}
		<code>cancopy={false}</code>
		{m.docs_page_codesnippet_s3_desc_suffix()}
	</p>
	<div class={styles.showcaseContainer}>
		<div class={styles.showcase}>
			<CodeSnippet
				code={inlineCode}
				language="ts"
				showLineNumbers={true}
				cancopy={false}
				filename="math-utility.ts" />
		</div>
	</div>

	<h2>{m.docs_page_codesnippet_s4_heading()}</h2>
	<p class={styles.paragraph}>
		{m.docs_page_codesnippet_s4_desc()}
	</p>
	<div class={styles.showcaseContainer}>
		<div class={styles.showcase}>
			<CodeSnippet
				code={`{
	"name": "@davidnet-net/svelte-ui",
	"version": "2.0.28",
	"private": true,
	"dependencies": {
		"prismjs": "^1.30.0"
	}
}`}
				language="json" />
		</div>
	</div>

	<div style="padding-bottom: 10vh;"></div>

	<Flex direction="column" gap="medium">
		<div>
			<h3
				style="padding-bottom: {token.global.spacing.small}; font-size: {token.global.font.size
					.large}">
				<Anchor
					href="https://github.com/davidnet-net/svelte-ui/blob/main/src/lib/components/primitives/CodeSnippet/CodeSnippet.svelte">
					CodeSnippet.svelte
				</Anchor>
			</h3>
			<Changelog
				gitpath="src/lib/components/primitives/CodeSnippet/CodeSnippet.svelte"
				repoUrl="https://github.com/davidnet-net/svelte-ui" />
		</div>
		<Divider />
		<div>
			<h3
				style="padding-bottom: {token.global.spacing.small}; font-size: {token.global.font.size
					.large}">
				<Anchor
					href="https://github.com/davidnet-net/svelte-ui/blob/main/src/lib/components/primitives/CodeSnippet/CodeSnippet.css.ts">
					CodeSnippet.css.ts
				</Anchor>
			</h3>
			<Changelog
				gitpath="src/lib/components/primitives/CodeSnippet/CodeSnippet.css.ts"
				repoUrl="https://github.com/davidnet-net/svelte-ui" />
		</div>
	</Flex>
</div>
