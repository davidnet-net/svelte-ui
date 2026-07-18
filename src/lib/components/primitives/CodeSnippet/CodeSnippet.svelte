<script lang="ts">
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

	// 1. SSR-Safe Fallback: Plain HTML escaping for initial page load
	const fallbackCode = $derived(
		rawCode
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#039;")
	);

	// 2. Local state for the client-side highlighted result
	let highlightedResult = $state<string | null>(null);

	// 3. The actual HTML we render (uses fallback until Prism finishes)
	const htmlToRender = $derived(highlightedResult ?? fallbackCode);

	// 4. Client-side highlighting logic
	$effect(() => {
		const cleanLang = mapLanguage(language);
		let isActive = true; // Prevents race conditions if props change quickly

		async function applyHighlight() {
			// Dynamically import the grammar if not loaded
			if (!Prism.languages[cleanLang]) {
				try {
					// Vite automatically code-splits these files!
					await import(`prismjs/components/prism-${cleanLang}.js`);
				} catch (e) {
					console.error(`[CodeSnippet]: Syntax highlighting failed for language "${language}"`, e);
					if (isActive) highlightedResult = null;
					return;
				}
			}

			if (isActive) {
				if (Prism.languages[cleanLang]) {
					highlightedResult = Prism.highlight(rawCode, Prism.languages[cleanLang], cleanLang);
				} else {
					highlightedResult = null;
				}
			}
		}

		applyHighlight();

		return () => {
			isActive = false; // Cleanup if `rawCode` or `language` changes before import finishes
		};
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
		<pre class={styles.codeArea}><code>{@html htmlToRender}</code></pre>
	</div>
</div>
