<script lang="ts">
	// Import PrismJS grammars for common languages
	import "prismjs/components/prism-markup"; // HTML, XML, SVG
	import "prismjs/components/prism-css";
	import "prismjs/components/prism-clike";
	import "prismjs/components/prism-javascript";
	import "prismjs/components/prism-typescript";
	import "prismjs/components/prism-json";
	import "prismjs/components/prism-bash";
	import "prismjs/components/prism-python";
	import "prismjs/components/prism-rust";
	import "prismjs/components/prism-go";
	import "prismjs/components/prism-sql";
	import "prismjs/components/prism-markdown";
	import "prismjs/components/prism-yaml";

	import Prism from "prismjs";
	import { onDestroy } from "svelte";

	import IconButton from "$lib/components/input/IconButton/IconButton.svelte";
	import Icon from "$lib/components/primitives/Icon/Icon.svelte";

	import { styles } from "./CodeSnippet.css";

	interface Props {
		/**
		 * The code string to render.
		 */
		code?: string;

		/**
		 * Fallback / alias for code prop.
		 */
		codeSnippet?: string;

		/**
		 * Programming language of the snippet (e.g. 'javascript', 'typescript', 'json', 'html', etc.).
		 */
		language: string;

		/**
		 * Allow copying the code to clipboard.
		 * @default true
		 */
		cancopy?: boolean;

		/**
		 * Optional filename to display in the header bar.
		 */
		filename?: string;

		/**
		 * Show line numbers.
		 * @default false
		 */
		showLineNumbers?: boolean;
	}

	let {
		code,
		codeSnippet,
		language,
		cancopy = true,
		filename,
		showLineNumbers = false
	}: Props = $props();

	let copied = $state(false);
	let copyTimeout: ReturnType<typeof setTimeout>;

	const rawCode = $derived((code ?? codeSnippet ?? "").trim());
	const lines = $derived(rawCode.split("\n"));

	// Map common extensions or names to Prism's registered language names
	const mapLanguage = (lang: string): string => {
		const l = lang.toLowerCase().trim();
		switch (l) {
			case "js":
				return "javascript";
			case "svelte":
				return "html";
			case "ts":
				return "typescript";
			case "sh":
				return "bash";
			case "yml":
				return "yaml";
			case "html":
			case "xml":
			case "svg":
				return "markup";
			case "md":
				return "markdown";
			case "rs":
				return "rust";
			case "py":
				return "python";
			default:
				return l;
		}
	};

	// Derive highlighted HTML code
	const highlightedCode = $derived.by(() => {
		const cleanLang = mapLanguage(language);
		const grammar = Prism.languages[cleanLang];

		if (grammar) {
			try {
				return Prism.highlight(rawCode, grammar, cleanLang);
			} catch (e) {
				console.error(`[CodeSnippet]: Syntax highlighting failed for language "${language}"`, e);
			}
		}

		// Fallback: safe HTML escaping for plain text
		return rawCode
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#039;");
	});

	function handleCopy(event: MouseEvent) {
		event.preventDefault();
		navigator.clipboard
			.writeText(rawCode)
			.then(() => {
				copied = true;
				clearTimeout(copyTimeout);
				copyTimeout = setTimeout(() => {
					copied = false;
				}, 2000);
			})
			.catch((err) => {
				console.error("[CodeSnippet]: Failed to copy code", err);
			});
	}

	// Clean up timers on component destruction
	onDestroy(() => {
		clearTimeout(copyTimeout);
	});
</script>

<div class={styles.container}>
	{#if filename || cancopy || language}
		<div class={styles.header}>
			<div class={styles.headerLeft}>
				<Icon icon="code" size="small" />
				{#if filename}
					<span class={styles.filename}>{filename}</span>
				{:else}
					<span class={styles.filename}>{language}</span>
				{/if}
			</div>
			<div class={styles.headerRight}>
				{#if language}
					<span class={styles.languageBadge}>{language}</span>
				{/if}
				{#if cancopy}
					<IconButton
						icon={copied ? "check" : "content_copy"}
						tip={copied ? "Copied!" : "Copy code"}
						onclick={handleCopy}
						appearance="subtle" />
				{/if}
			</div>
		</div>
	{/if}

	<div class={styles.body}>
		{#if showLineNumbers}
			<div class={styles.lineNumbersGutter}>
				{#each lines as _, i (_)}
					<span class={styles.lineNumber}>{i + 1}</span>
				{/each}
			</div>
		{/if}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<pre class={styles.codeArea}><code>{@html highlightedCode}</code></pre>
	</div>
</div>
