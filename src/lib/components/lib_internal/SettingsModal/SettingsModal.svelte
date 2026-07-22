<script lang="ts">
	import { PUBLIC_ACCOUNT_FRONTEND_URL } from "$env/static/public";
	import { PUBLIC_BACKEND_URL } from "$env/static/public"; // 1. Added backend URL import
	import { Dropdown } from "$lib/components/input";
	import Button from "$lib/components/input/Button/Button.svelte";
	import LinkButton from "$lib/components/input/LinkButton/LinkButton.svelte";
	import Modal from "$lib/components/messaging/Modal/Modal.svelte";
	import VisuallyHidden from "$lib/components/messaging/VisuallyHidden/VisuallyHidden.svelte";
	import Tab from "$lib/components/navigation/Tab/Tab.svelte";
	import TabPanel from "$lib/components/navigation/TabPanel/TabPanel.svelte";
	import Tabs from "$lib/components/navigation/Tabs/Tabs.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import { authState } from "$lib/engines";
	import { currentTheme, setTheme, type themeNames } from "$lib/engines/themeEngine.svelte";
	import {
		getDateFormat,
		getFirstDayOfWeek,
		getTimezone,
		LANGUAGE_CACHE_KEY,
		setDateFormat,
		setFirstDayOfWeek,
		setLanguage,
		setTimezone
	} from "$lib/engines/translationEngine.svelte";
	import { m as library_messages } from "$lib/paraglide/messages.js";
	import { token } from "$lib/styles/designTokens";
	import { getCookie, patchFetch } from "$lib/utils";

	interface Props {
		onClose: () => void;
	}

	let { onClose }: Props = $props();

	let language = $state("en-us");
	let theme = $state("dark");
	let timezone = $state("UTC");
	let firstDayOfWeek = $state("monday");
	let dateFormat = $state("YYYY-MM-DD");

	let languageDropdownOpen = $state(false);
	let themeDropdownOpen = $state(false);
	let timezoneDropdownOpen = $state(false);
	let firstDayDropdownOpen = $state(false);
	let dateFormatDropdownOpen = $state(false);

	const languages = [
		{ value: "en-us", label: "English - US" },
		{ value: "nl", label: "Nederlands" }
	];

	const themes = [
		{ value: "system", label: "System" },
		{ value: "dark", label: "Dark" },
		{ value: "light", label: "Light" },
		{ value: "contrast", label: "Contrast" }
	];

	const daysOfWeek = [
		{ value: "monday", label: "Monday" },
		{ value: "tuesday", label: "Tuesday" },
		{ value: "wednesday", label: "Wednesday" },
		{ value: "thursday", label: "Thursday" },
		{ value: "friday", label: "Friday" },
		{ value: "saturday", label: "Saturday" },
		{ value: "sunday", label: "Sunday" }
	];

	const dateFormats = ["YYYY-MM-DD", "DD-MM-YYYY", "MM-DD-YYYY"];

	const timezones =
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		typeof Intl !== "undefined" && Intl.supportedValuesOf
			? Intl.supportedValuesOf("timeZone")
			: ["UTC"];

	let activeTab = $state("general");
	async function updatePreference(payload: Record<string, string>) {
		if (!authState.isLoggedIn) {
			return;
		}
		await patchFetch(`${PUBLIC_BACKEND_URL}/auth/preferences`, payload, undefined, true);
	}

	$effect(() => {
		const LANGUAGE = getCookie(LANGUAGE_CACHE_KEY) || "en-us";
		language = LANGUAGE;
		theme = currentTheme.themeName;

		timezone = getTimezone();
		firstDayOfWeek = getFirstDayOfWeek();
		dateFormat = getDateFormat();
	});
</script>

<Tabs bind:selected={activeTab}>
	<Modal title={library_messages.lib_component_settings_modal_title()} onclose={onClose}>
		<Flex direction="column" gap="small">
			<Flex direction="row" gap="small">
				<Tab value="general">General</Tab>
				<Tab value="locales">Locales</Tab>
			</Flex>
			<TabPanel value="general">
				<h2 style="font-size: {token.global.font.size.medium}">Select the theme you prefer:</h2>
				<Dropdown isOpen={themeDropdownOpen}>
					{#snippet trigger()}
						<Button iconbefore="palette" onclick={() => (themeDropdownOpen = !themeDropdownOpen)}>
							{themes.find((t) => t.value === theme)?.label || theme}
						</Button>
					{/snippet}
					{#each themes as t (t.value)}
						<Button
							appearance="subtle"
							onclick={() => {
								theme = t.value;
								themeDropdownOpen = false;
								setTheme(t.value as themeNames);
								updatePreference({ theme: t.value });
							}}>
							{t.label}
						</Button>
					{/each}
				</Dropdown>
			</TabPanel>

			<TabPanel value="locales">
				<h2 style="font-size: {token.global.font.size.medium}">Select the language you prefer:</h2>
				<Dropdown isOpen={languageDropdownOpen}>
					{#snippet trigger()}
						<Button
							iconbefore="language"
							onclick={() => (languageDropdownOpen = !languageDropdownOpen)}>
							{languages.find((l) => l.value === language)?.label || language}
						</Button>
					{/snippet}
					{#each languages as lang (lang.value)}
						<Button
							appearance="subtle"
							onclick={async () => {
								language = lang.value;
								languageDropdownOpen = false;
								await updatePreference({ language: lang.value });
								setLanguage(lang.value);
							}}>
							{lang.label}
						</Button>
					{/each}
				</Dropdown>

				<h2 style="font-size: {token.global.font.size.medium}">Select your timezone:</h2>
				<Dropdown isOpen={timezoneDropdownOpen}>
					{#snippet trigger()}
						<Button
							iconbefore="schedule"
							onclick={() => (timezoneDropdownOpen = !timezoneDropdownOpen)}>
							{timezone}
						</Button>
					{/snippet}
					{#each timezones as tz (tz)}
						<Button
							appearance="subtle"
							onclick={() => {
								timezone = tz;
								timezoneDropdownOpen = false;
								setTimezone(tz);
								updatePreference({ timezone: tz });
							}}>
							{tz}
						</Button>
					{/each}
				</Dropdown>

				<h2 style="font-size: {token.global.font.size.medium}">
					Select the first day of the week:
				</h2>
				<Dropdown isOpen={firstDayDropdownOpen}>
					{#snippet trigger()}
						<Button
							iconbefore="calendar_today"
							onclick={() => (firstDayDropdownOpen = !firstDayDropdownOpen)}>
							{daysOfWeek.find((d) => d.value === firstDayOfWeek)?.label || firstDayOfWeek}
						</Button>
					{/snippet}
					{#each daysOfWeek as day (day.value)}
						<Button
							appearance="subtle"
							onclick={() => {
								firstDayOfWeek = day.value;
								firstDayDropdownOpen = false;
								setFirstDayOfWeek(day.value);
								updatePreference({ firstDayOfWeek: day.value });
							}}>
							{day.label}
						</Button>
					{/each}
				</Dropdown>

				<h2 style="font-size: {token.global.font.size.medium}">Select your date format:</h2>
				<Dropdown isOpen={dateFormatDropdownOpen}>
					{#snippet trigger()}
						<Button
							iconbefore="date_range"
							onclick={() => (dateFormatDropdownOpen = !dateFormatDropdownOpen)}>
							{dateFormat}
						</Button>
					{/snippet}
					{#each dateFormats as format (format)}
						<Button
							appearance="subtle"
							onclick={() => {
								dateFormat = format;
								dateFormatDropdownOpen = false;
								setDateFormat(format);
								updatePreference({ dateFormat: format });
							}}>
							{format}
						</Button>
					{/each}
				</Dropdown>
			</TabPanel>
		</Flex>
		{#snippet actions()}
			<LinkButton href={PUBLIC_ACCOUNT_FRONTEND_URL + "/account/settings/preferences"}>
				{library_messages.lib_component_settings_modal_all_settings()}
			</LinkButton>
			<Button onclick={onClose} appearance="primary">
				{library_messages.lib_common_close()}
				<VisuallyHidden>{library_messages.lib_component_settings_modal_close_alt()}</VisuallyHidden>
			</Button>
		{/snippet}
	</Modal>
</Tabs>
