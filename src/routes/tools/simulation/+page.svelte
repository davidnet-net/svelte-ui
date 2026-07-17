<script lang="ts">
	/* eslint-disable @typescript-eslint/no-explicit-any */
	import { onMount } from "svelte";

	import Button from "$lib/components/input/Button/Button.svelte";
	import IconButton from "$lib/components/input/IconButton/IconButton.svelte";
	import Spinner from "$lib/components/loading/Spinner/Spinner.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import Icon from "$lib/components/primitives/Icon/Icon.svelte";
	import { appState } from "$lib/engines/appStateEngine.svelte";
	import { currentTheme, type themeNames } from "$lib/engines/themeEngine.svelte";
	import Header from "$lib/internal/components/Header/Header.svelte";
	import NavigationData from "$lib/internal/components/NavigationData.svelte";
	import { getComponentRegistry } from "$lib/internal/utils/componentRegistery";
	import * as m from "$lib/paraglide/messages.js";
	import { sleep } from "$lib/utils/sleep";

	import * as styles from "./page.css";

	let iframeRef: HTMLIFrameElement | null = $state(null);
	let simulationControlLoaded = $state(false);
	let showSimulation = $state(false);
	let isRenderingPreview = $state(false);
	let bypassScreenCheck = $state(false);
	let notSupportedScreen = $derived(appState.isMobile && !bypassScreenCheck);
	let codeCopiedFeedback = $state(false);

	let activeComponentId = $state("Button");
	let activeComponentProps = $state<Record<string, any>>({
		appearance: "success",
		children: "Test Button",
		stretchwidth: false,
		loading: false
	});

	let simulationTheme = $state<themeNames>("dark");

	function generateStandaloneRunnerUrl(): string {
		const baseUrl = window.location.origin + "/tools/simulation/runner";

		const appStatePayload = {
			hideNavigation: true,
			systemPreference: $state.snapshot(appState.systemPreference)
		};

		const params = new URLSearchParams({
			id: activeComponentId,
			theme: simulationTheme,
			isMobile: String(appState.isMobile),
			appState: JSON.stringify(appStatePayload),
			props: JSON.stringify($state.snapshot(activeComponentProps))
		});

		return `${baseUrl}?${params.toString()}`;
	}

	let linkCopiedFeedback = $state(false);

	async function copyStandaloneLink() {
		const targetUrl = generateStandaloneRunnerUrl();
		try {
			await navigator.clipboard.writeText(targetUrl);
			linkCopiedFeedback = true;
			await sleep(2000);
			linkCopiedFeedback = false;
		} catch (err) {
			console.error("[Simulation Control] Failed to copy standalone link:", err);
			// TODO: Show toast
		}
	}

	let componentRegistry: undefined | Record<any, any> = $state(undefined);
	function sendCommandToSimulation(type: string, payload: any) {
		if (iframeRef?.contentWindow) {
			iframeRef.contentWindow.postMessage({ type, payload }, "*");
		}
	}

	function cycleTheme() {
		const themeOrder: themeNames[] = ["light", "dark", "contrast"];
		const currentIndex = themeOrder.indexOf(simulationTheme);

		const safeIndex = currentIndex === -1 ? 0 : currentIndex;

		const nextIndex = (safeIndex + 1) % themeOrder.length;
		const nextTheme = themeOrder[nextIndex]!;

		simulationTheme = nextTheme;

		sendCommandToSimulation("SIMULATION_SET_THEME", nextTheme);
	}

	async function copyComponentCode() {
		let slotsContent = "";
		const propStrings: string[] = [];

		for (const [key, value] of Object.entries(activeComponentProps)) {
			if (key === "children") {
				slotsContent = String(value);
				continue;
			}
			if (typeof value === "string") {
				propStrings.push(`${key}="${value}"`);
			} else if (typeof value === "boolean") {
				if (value) propStrings.push(key);
			} else {
				propStrings.push(`${key}={${JSON.stringify(value)}}`);
			}
		}

		const attributesString = propStrings.length > 0 ? ` ${propStrings.join(" ")}` : "";
		const componentString = slotsContent
			? `<${activeComponentId}${attributesString}>${slotsContent}</${activeComponentId}>`
			: `<${activeComponentId}${attributesString} />`;

		try {
			await navigator.clipboard.writeText(componentString);
			codeCopiedFeedback = true;
			await sleep(2000);
			codeCopiedFeedback = false;
		} catch (err) {
			console.error("[Simulation Control] System browser clipboard access denied:", err);
			// TODO: Show toast
		}
	}

	async function triggerComponentRender() {
		await sleep(2000);
		console.debug("[Simulation Control] Creating a test task [TEMP REMOVE THIS LATER].");
		sendCommandToSimulation("RENDER_AUTOMATED_PREVIEW", {
			id: activeComponentId.toLowerCase(),
			props: $state.snapshot(activeComponentProps)
		});
	}

	async function handleRestart() {
		if (!iframeRef) return;
		showSimulation = false;
		isRenderingPreview = true;
		await sleep(1000);
		iframeRef.src = iframeRef.src;
	}

	onMount(() => {
		const handleMessage = async (event: MessageEvent) => {
			if (event.data.type === "SIMULATION_READY") {
				console.debug("[Simulation Control] Simulation ready signal acknowledged.");

				await sleep(200);

				if (currentTheme.themeName === "system") {
					simulationTheme = appState.systemPreference.darkMode ? "dark" : "light";
				} else {
					simulationTheme = currentTheme.themeName;
				}

				sendCommandToSimulation("SIMULATION_SET_THEME", simulationTheme);
				sendCommandToSimulation("SIMULATION_MUTATE_APP_STATE", {
					hideNavigation: true,
					systemPreference: $state.snapshot(appState.systemPreference)
				});

				(async () => {
					await sleep(1800);
					showSimulation = true;

					await triggerComponentRender();
				})();
			}
		};

		window.addEventListener("message", handleMessage);

		console.debug("[Simulation Control] Assuming simulationControlLoaded is prepared!");
		simulationControlLoaded = true;

		(async () => {
			componentRegistry = await getComponentRegistry();
			console.groupCollapsed("[Simulation Control] Component Registry Dump");
			console.debug($state.snapshot(componentRegistry));
			console.groupEnd();
		})();

		return () => window.removeEventListener("message", handleMessage);
	});
</script>

<NavigationData />
<Header
	heading={m.docs_page_simulation_header_heading()}
	paragraph={m.docs_page_simulation_header_paragraph()} />

<Flex direction="column" height="80vh" width="100%" justifyContent="center" alignItems="center">
	<div class={styles.simulationContainer}>
		{#if simulationControlLoaded}
			{#if notSupportedScreen}
				<div class={styles.iframeWrapper}>
					<Flex direction="column" justifyContent="center" alignItems="center" gap="medium">
						<Icon icon="computer_cancel" size="giant" color="danger" />
						<p style="text-align: center;">
							{m.docs_page_simulation_too_small_screen_warning()}
						</p>

						<Button
							appearance="danger"
							onclick={() => {
								bypassScreenCheck = true;
							}}>
							{m.docs_page_simulation_proceed_anyway()}
						</Button>
					</Flex>
				</div>
			{/if}
			{#if (!showSimulation || isRenderingPreview) && !notSupportedScreen}
				<div class={styles.iframeWrapper}>
					<Flex direction="column" justifyContent="center" alignItems="center" gap="medium">
						<Spinner size="huge" />
						<p style="text-align: center;">
							{m.docs_page_simulation_preparing_environment()}
						</p>
					</Flex>
				</div>
			{/if}

			<div
				class={styles.iframeWrapper}
				style:opacity={showSimulation && !notSupportedScreen ? 1 : 0}
				style:pointer-events={showSimulation && !notSupportedScreen ? "auto" : "none"}>
				<div class={styles.topbar}>
					<Flex direction="row" justifyContent="spaceBetween" alignItems="center" gap="medium">
						<Flex
							direction="row"
							justifyContent="center"
							alignItems="center"
							gap="small"
							width="fit-content">
							<Icon type="outlined" icon="computer" />
							<p>{m.docs_page_simulation_title({ activeComponentId })}</p>
						</Flex>
						<Flex
							direction="row"
							justifyContent="center"
							alignItems="center"
							gap="small"
							width="fit-content">
							<IconButton
								appearance="default"
								icon={codeCopiedFeedback ? "check" : "content_copy"}
								onclick={copyComponentCode}
								tip={codeCopiedFeedback
									? m.docs_page_simulation_copied()
									: m.docs_page_simulation_copy_code_tip()} />
							<IconButton
								appearance="default"
								icon={linkCopiedFeedback ? "check" : "open_in_new"}
								onclick={copyStandaloneLink}
								tip={linkCopiedFeedback
									? m.docs_page_simulation_copied()
									: m.docs_page_simulation_copy_link_tip()} />
							<IconButton
								appearance="default"
								icon={simulationTheme === "light"
									? "light_mode"
									: simulationTheme === "dark"
										? "dark_mode"
										: "contrast"}
								onclick={cycleTheme}
								tip={m.docs_page_simulation_theme_cycle_tip({ theme: simulationTheme })} />
							<IconButton
								appearance="default"
								icon="refresh"
								onclick={handleRestart}
								tip={m.docs_page_simulation_restart_tip()} />
						</Flex>
					</Flex>
				</div>
				<iframe
					bind:this={iframeRef}
					class={styles.iframe}
					src={window.location.origin + "/tools/simulation/runner"}
					title="Simulation">
				</iframe>
			</div>
		{/if}
	</div>
</Flex>
