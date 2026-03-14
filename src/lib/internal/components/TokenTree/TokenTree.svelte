<script lang="ts">
	import { onMount } from "svelte";

	import Button from "$lib/components/input/Button/Button.svelte";

	import * as styles from "./TokenTree.css.ts";
	import TokenTree from "./TokenTree.svelte";

	interface Props {
		//eslint-disable-next-line @typescript-eslint/no-explicit-any
		node: any;
		path?: string;
		depth?: number;
	}

	let { node, path = "", depth = 2 }: Props = $props();

	let copiedKey = $state<string | null>(null);
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	//TODO: PERFORMANCE BOTTLENECK - FORCED REFLOW
	function resolveCssValue(cssValue: string): string {
		if (typeof window === "undefined" || !cssValue || !mounted) return cssValue;

		const shell =
			document.querySelector("#appshell") ||
			document.querySelector(".appshell") ||
			document.documentElement;

		if (!cssValue.includes("var(")) return cssValue;

		const varMatch = cssValue.match(/var\((--[^,)]+)/);
		if (!varMatch) return cssValue;
		const varName = varMatch[1].trim();

		const shellStyles = getComputedStyle(shell);
		let resolved = shellStyles.getPropertyValue(varName).trim();

		if (!resolved || resolved.includes("var(")) {
			const temp = document.createElement("span");
			temp.style.display = "none";
			temp.style.color = cssValue;
			shell.appendChild(temp);
			const computed = getComputedStyle(temp).color;
			shell.removeChild(temp);

			if (computed !== "rgb(0, 0, 0)" || cssValue.includes("black") || cssValue.includes("#000")) {
				resolved = computed;
			}
		}

		if (!resolved || resolved === "rgb(0, 0, 0)") {
			const temp = document.createElement("span");
			temp.style.display = "none";
			temp.style.marginTop = cssValue;
			shell.appendChild(temp);
			resolved = getComputedStyle(temp).marginTop;
			shell.removeChild(temp);
		}

		return resolved || cssValue;
	}

	function isColor(strColor: string) {
		if (typeof window === "undefined") return false;
		if (strColor.startsWith("var(")) return false;
		const s = new Option().style;
		s.color = strColor;
		return s.color !== "";
	}

	const copyToClipboard = async (fullPath: string) => {
		const formattedPath = `token.${fullPath}`;
		try {
			await navigator.clipboard.writeText(formattedPath);
			copiedKey = fullPath;
			setTimeout(() => (copiedKey = null), 2000);
		} catch (err) {
			console.error(err);
		}
	};

	//eslint-disable-next-line @typescript-eslint/no-explicit-any
	const isObject = (val: any) => val !== null && typeof val === "object" && !Array.isArray(val);

	// svelte-ignore state_referenced_locally
	const headingLevel = Math.min(Math.max(depth, 2), 6);
</script>

<div class={styles.tokenLevel}>
	{#each Object.entries(node) as [key, value] (key)}
		{@const currentPath = path ? `${path}.${key}` : key}
		{@const resolvedValue = resolveCssValue(String(value))}

		<div class="token-item">
			{#if isObject(value)}
				<svelte:element this={`h${headingLevel}`} class={styles.tokenHeading}>
					{key}
				</svelte:element>
				<TokenTree node={value} path={currentPath} depth={depth + 1} />
			{:else}
				<div class={styles.tokenRow}>
					<div class={styles.tokenInfo}>
						<span class={styles.key}>{key}</span>
						<div class={styles.valueContainer}>
							{#if isColor(resolvedValue)}
								<div class={styles.swatch} style="background: {value}"></div>
							{/if}
							<code class={styles.tokenValue}>{resolvedValue}</code>
							<span class={styles.rawVariable}>{value}</span>
						</div>
					</div>
					<Button
						onclick={() => copyToClipboard(currentPath)}
						iconafter={copiedKey === currentPath ? "check_small" : "content_copy"}>
						Copy Token
					</Button>
				</div>
			{/if}
		</div>
	{/each}
</div>
