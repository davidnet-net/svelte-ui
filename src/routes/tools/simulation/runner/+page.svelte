<script lang="ts">
	/* eslint-disable @typescript-eslint/no-explicit-any */
	import { type Component, onMount } from "svelte";
	import { createRawSnippet } from "svelte";

	import Flex from "$lib/components/primitives/Flex/Flex.svelte";

	const modules = import.meta.glob("/src/lib/components/**/*.svelte");

	let TargetComponent = $state<Component | null>(null);
	let componentProps = $state<Record<string, any>>({});

	function findModulePathById(id: string): string | undefined {
		const lowerId = id.toLowerCase();
		return Object.keys(modules).find((path) => {
			const fileName = path.split("/").pop() || "";
			let cleanName = fileName.replace(".svelte", "").toLowerCase();

			if (cleanName === "index") {
				const parts = path.split("/");
				cleanName = parts![parts!.length - 2]!.toLowerCase();
			}
			return cleanName === lowerId;
		});
	}

	function processDynamicProps(rawProps: Record<string, any>): Record<string, any> {
		const processed: Record<string, any> = { ...rawProps };

		if (processed.children && typeof processed.children === "string") {
			const textValue = processed.children;
			processed.children = createRawSnippet(() => ({
				render: () => `<span>${textValue}</span>`
			}));
		}

		return processed;
	}

	async function loadComponentDirectly(id: string, rawProps: Record<string, any>) {
		console.debug(`[Simulation] Resolving direct URL target: "${id}"`);
		const matchPath = findModulePathById(id);

		if (!matchPath) {
			console.error(`[Simulation] No structural component found matching key signature: "${id}"`);
			return;
		}

		try {
			const moduleLoader = modules[matchPath] as () => Promise<any>;
			const moduleNamespace = await moduleLoader();

			componentProps = processDynamicProps(rawProps);
			TargetComponent = moduleNamespace.default;
		} catch (err) {
			console.error(
				`[Simulation] Runtime allocation breakdown during direct component tree traversal:`,
				err
			);
		}
	}

	onMount(() => {
		const handleMessage = async (event: MessageEvent) => {
			const { type, payload } = event.data;

			if (type === "RENDER_AUTOMATED_PREVIEW") {
				const { id, props } = payload;
				await loadComponentDirectly(id, props || {});
			}
		};

		window.addEventListener("message", handleMessage);

		const urlParams = new URLSearchParams(window.location.search);
		const queryId = urlParams.get("id");
		const queryPropsRaw = urlParams.get("props");

		if (queryId && !(window.parent !== window)) {
			let parsedProps = {};
			if (queryPropsRaw) {
				try {
					parsedProps = JSON.parse(decodeURIComponent(queryPropsRaw));
				} catch (e) {
					console.error("[Simulation] Failed to decode inline preview parameters payload:", e);
				}
			}
			loadComponentDirectly(queryId, parsedProps);
		}

		return () => window.removeEventListener("message", handleMessage);
	});
</script>

<Flex width="100%" height="100%" direction="column" alignItems="center" justifyContent="center">
	{#if TargetComponent}
		<TargetComponent {...componentProps} />
	{/if}
</Flex>
