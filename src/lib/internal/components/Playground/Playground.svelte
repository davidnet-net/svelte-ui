<script lang="ts">
	import { onMount } from "svelte";

	import Spinner from "$lib/components/loading/Spinner/Spinner.svelte";
	import CodeSnippet from "$lib/components/primitives/CodeSnippet/CodeSnippet.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import { appState } from "$lib/engines/appStateEngine.svelte";
	import { currentTheme } from "$lib/engines/themeEngine.svelte";

	import { styles } from "./Playground.css";

	interface Props {
		/**
		 * The registration key / name of the component to load (e.g. 'Button', 'Avatar').
		 */
		componentId: string;

		/**
		 * Props to pass to the preview component.
		 */
		props: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

		/**
		 * The height of the preview frame container.
		 * @default "140px"
		 */
		height?: string;
	}

	let { componentId, props, height = "140px" }: Props = $props();

	let iframeRef = $state<HTMLIFrameElement | null>(null);
	let isReady = $state(false);

	const runnerUrl = $derived.by(() => {
		if (typeof window === "undefined") return "";
		return window.location.origin + "/tools/simulation/runner";
	});

	// Reactively generate the usage code snippet based on componentId and props
	const generatedCode = $derived.by(() => {
		let slotsContent = "";
		const propStrings: string[] = [];

		for (const [key, value] of Object.entries(props)) {
			if (key === "children") {
				slotsContent = String(value);
				continue;
			}
			if (typeof value === "string") {
				propStrings.push(`${key}="${value}"`);
			} else if (typeof value === "boolean") {
				if (value) propStrings.push(key);
			} else if (typeof value === "number") {
				propStrings.push(`${key}={${value}}`);
			} else {
				propStrings.push(`${key}={${JSON.stringify(value)}}`);
			}
		}

		const attributesString = propStrings.length > 0 ? ` ${propStrings.join(" ")}` : "";
		return slotsContent
			? `<${componentId}${attributesString}>${slotsContent}</${componentId}>`
			: `<${componentId}${attributesString} />`;
	});

	onMount(() => {
		const handleMessage = (event: MessageEvent) => {
			if (event.source === iframeRef?.contentWindow) {
				if (event.data.type === "SIMULATION_READY") {
					isReady = true;

					const activeTheme =
						currentTheme.themeName === "system"
							? appState.systemPreference.darkMode
								? "dark"
								: "light"
							: currentTheme.themeName;

					// Send initial settings to the runner iframe
					iframeRef.contentWindow!.postMessage(
						{
							type: "SIMULATION_SET_THEME",
							payload: activeTheme
						},
						"*"
					);

					iframeRef.contentWindow!.postMessage(
						{
							type: "SIMULATION_MUTATE_APP_STATE",
							payload: {
								hideNavigation: true,
								systemPreference: $state.snapshot(appState.systemPreference)
							}
						},
						"*"
					);

					iframeRef.contentWindow!.postMessage(
						{
							type: "RENDER_AUTOMATED_PREVIEW",
							payload: {
								id: componentId.toLowerCase(),
								props: $state.snapshot(props)
							}
						},
						"*"
					);
				}
			}
		};

		window.addEventListener("message", handleMessage);
		return () => window.removeEventListener("message", handleMessage);
	});

	// Reactively push theme changes to the running preview
	$effect(() => {
		if (!isReady || !iframeRef?.contentWindow) return;

		const activeTheme =
			currentTheme.themeName === "system"
				? appState.systemPreference.darkMode
					? "dark"
					: "light"
				: currentTheme.themeName;

		iframeRef.contentWindow.postMessage(
			{
				type: "SIMULATION_SET_THEME",
				payload: activeTheme
			},
			"*"
		);
	});

	// Reactively push prop adjustments to the running preview
	$effect(() => {
		if (!isReady || !iframeRef?.contentWindow) return;

		iframeRef.contentWindow.postMessage(
			{
				type: "RENDER_AUTOMATED_PREVIEW",
				payload: {
					id: componentId.toLowerCase(),
					props: $state.snapshot(props)
				}
			},
			"*"
		);
	});
</script>

<div class={styles.container}>
	<div class={styles.iframeWrapper} style:height style="position: relative;">
		{#if !isReady}
			<div style="position: absolute; inset: 0; z-index: 10;">
				<Flex
					direction="column"
					height="100%"
					justifyContent="center"
					alignItems="center"
					gap="medium">
					<Spinner size="large" />
					<p style="margin: 0; text-align: center; font-size: 0.875rem; opacity: 0.8;">
						Preparing environment...
					</p>
				</Flex>
			</div>
		{/if}
		{#if runnerUrl}
			<iframe
				bind:this={iframeRef}
				src={runnerUrl}
				title="Isolated Component Preview"
				class={styles.previewIframe}
				style:opacity={isReady ? 1 : 0}
				style:pointer-events={isReady ? "auto" : "none"}
				style:transition="opacity 0.3s ease"
				style="width: 100%; height: 100%; border: none;">
			</iframe>
		{/if}
	</div>
	<div class={styles.snippetWrapper}>
		<CodeSnippet code={generatedCode} language="svelte" showLineNumbers={false} cancopy={true} />
	</div>
</div>
