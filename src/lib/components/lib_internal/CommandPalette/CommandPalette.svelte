<script lang="ts">
	import { PUBLIC_ACCOUNT_FRONTEND_URL, PUBLIC_BACKEND_URL } from "$env/static/public";
	import Skeleton from "$lib/components/loading/Skeleton/Skeleton.svelte";
	import { Blanket } from "$lib/components/overlays";
	import Anchor from "$lib/components/primitives/Anchor/Anchor.svelte";
	import Avatar from "$lib/components/primitives/Avatar/Avatar.svelte";
	import Flex from "$lib/components/primitives/Flex/Flex.svelte";
	import Icon from "$lib/components/primitives/Icon/Icon.svelte";
	import { authState, focusTrap, logout, shortcutTrap, useShortcut } from "$lib/engines";
	import type { NavigationItem } from "$lib/internal/navigationData.svelte";
	import { token } from "$lib/styles";
	import type { iconType } from "$lib/types";
	import { getFetch } from "$lib/utils";
	import * as styles from "./CommandPalette.css";

	interface Props {
		navigationData?: NavigationItem[];
		isQuickSettingsOpen?: boolean;
		isOpen?: boolean; // Made optional so it can be bound using bind:isOpen
		feedbackOpen?: boolean;
		isShortcutModalOpen?: boolean;
	}

	let {
		navigationData = [],
		isOpen = $bindable(false),
		isQuickSettingsOpen = $bindable(false),
		isShortcutModalOpen = $bindable(false),
		feedbackOpen = $bindable(false)
	}: Props = $props();

	let query = $state("");
	let inputRef = $state<HTMLInputElement | null>(null);

	// Mention state
	let showDropdown = $state(false);
	let mentionSearchQuery = $state("");
	let selectedIndex = $state(0);

	const MENTION_OPTIONS = [{ id: "user", label: "@user", description: "Mention a user" }] as const;

	interface Result {
		title: string;
		description?: string;
		href?: string;
		icon?: iconType;
		avatar?: string;
		action?: () => void;
	}

	// Simple fuzzy match helper: checks if query characters appear sequentially in target text
	function fuzzyMatch(queryText: string, targetText: string): boolean {
		const q = queryText.toLowerCase();
		const t = targetText.toLowerCase();
		let qIdx = 0;
		let tIdx = 0;

		while (qIdx < q.length && tIdx < t.length) {
			if (q[qIdx] === t[tIdx]) {
				qIdx++;
			}
			tIdx++;
		}
		return qIdx === q.length;
	}

	// Filter options based on what is typed after '@' using fuzzy search
	const filteredOptions = $derived(
		MENTION_OPTIONS.filter(
			(option) =>
				fuzzyMatch(mentionSearchQuery, option.label.slice(1)) ||
				fuzzyMatch(mentionSearchQuery, option.description ?? "")
		)
	);

	// Reactive expression to detect multiple unique mentioned usernames (removes duplicates like "david" & "david")
	const mentionedUsers = $derived.by(() => {
		const matches = [...query.matchAll(/@user\s+([^\s]+)/gi)];
		const usernames = matches
			.map((match) => match[1])
			.filter((username): username is string => username !== undefined);

		// Return unique array using Set
		return [...new Set(usernames)];
	});

	// Helper function to recursively search navigationData with fuzzy match support
	function searchNavigationItems(
		items: NavigationItem[],
		searchTerm: string,
		results: Result[] = []
	): Result[] {
		for (const item of items) {
			const matchesTitle = fuzzyMatch(searchTerm, item.pageName);
			const matchesDesc = item.description ? fuzzyMatch(searchTerm, item.description) : false;
			const matchesHref = fuzzyMatch(searchTerm, item.href);

			if (matchesTitle || matchesDesc || matchesHref) {
				results.push({
					title: item.pageName,
					description: item.description ?? item.href,
					href: item.href,
					icon: "menu_book"
				});
			}

			if (item.children && item.children.length > 0) {
				searchNavigationItems(item.children, searchTerm, results);
			}
		}

		return results;
	}

	// Static pool of quick actions available in the command palette
	const QUICK_ACTION_POOL: Result[] = [
		{
			title: "Quick Settings",
			description: "Theme & Locales",
			icon: "settings",
			action: () => {
				isQuickSettingsOpen = true;
				onclose();
			}
		},
		{
			title: "Send Feedback",
			description: "Submit bug reports or feature suggestions",
			icon: "feedback",
			action: () => {
				feedbackOpen = true;
				onclose();
			}
		},
		{
			title: "Active shortcuts",
			description: "View active keyboard shortcuts",
			icon: "keyboard_capslock_badge",
			action: () => {
				isShortcutModalOpen = true;
				onclose();
			}
		},
		{
			title: "Log in",
			icon: "login",
			href: "https://account.davidnet.net/login"
		},
		{
			title: "Log out",
			icon: "logout",
			action: () => {
				logout();
				onclose();
			}
		},
		{
			title: "Account",
			description: "Navigates to the account page",
			icon: "for_you",
			href: "https://account.davidnet.net"
		},
		{
			title: "Home",
			description: "One overview for everything",
			icon: "home",
			href: "https://home.davidnet.net"
		},
		{
			title: "Davidnet design",
			description: "Navigates to the davidnet design page",
			icon: "design_services",
			href: "https://design.davidnet.net"
		},
		{
			title: "Davidnet",
			description: "Navigates to the davidnet.net",
			icon: "arrow_outward",
			href: "https://davidnet.net"
		},
		{
			title: "Privacy & Policies",
			description: "Navigates to the legal pages",
			icon: "policy",
			href: "https://davidnet.net/legal"
		},
		{
			title: "Docs",
			description: "Navigates to the docs app",
			icon: "docs",
			href: "https://docs.davidnet.net"
		},
		{
			title: "Kanban",
			description: "Navigates to the kanban app",
			icon: "view_kanban",
			href: "https://kanban.davidnet.net"
		}
	];

	// States for Loading Skeleton vs Real Results
	let fakeProcessing = $state(false);
	let showResults = $state(false);
	let searchResults: Result[] = $state([]);
	let quickActionResults: Result[] = $state([]); // Added for system actions

	// Track timers and active fetch requests to prevent race conditions
	let timer1: NodeJS.Timeout | null = null;
	let currentFetchId = 0;

	function clearTimers() {
		if (timer1) clearTimeout(timer1);
		timer1 = null;
	}

	function hideAllViews() {
		clearTimers();
		fakeProcessing = false;
		showResults = false;
		searchResults = [];
		quickActionResults = [];
	}

	function onclose() {
		isOpen = false;
		hideAllViews();
		resetMentionState();
	}

	function open() {
		isOpen = true;
		setTimeout(() => inputRef?.focus(), 50);
	}

	function resetMentionState() {
		showDropdown = false;
		mentionSearchQuery = "";
		selectedIndex = 0;
	}

	// Helper function to evaluate safe mathematical expressions entered in the search query
	function evaluateMathExpression(expr: string): string | null {
		try {
			const sanitized = expr.replace(/[^0-9+\-*/().\s]/g, "");

			if (!/[0-9]/.test(sanitized) || !/[+\-*/()]/.test(sanitized)) {
				return null;
			}

			const result = Function(`'use strict'; return (${sanitized})`)();

			if (typeof result === "number" && !isNaN(result) && isFinite(result)) {
				return String(result);
			}
		} catch {
			// Invalid math syntax, ignore
		}
		return null;
	}

	// REAL ASYNC SEARCH FUNCTION
	async function performSearch(searchQuery: string, usersList: string[]) {
		const fetchId = ++currentFetchId;

		try {
			let navResults: Result[] = [];

			// 1. Filter quick actions using fuzzy search
			const matchedQuickActions = QUICK_ACTION_POOL.filter(
				(action) =>
					fuzzyMatch(searchQuery, action.title) ||
					(action.description && fuzzyMatch(searchQuery, action.description))
			);

			// 2. Skip searching navigationData if @user is present in the query
			if (usersList.length === 0) {
				navResults = searchNavigationItems(navigationData, searchQuery);
			}

			// Fetch user profiles for all unique mentioned users
			const profilePromises = usersList.map(async (username) => {
				const profileResult = await getFetch(
					`${PUBLIC_BACKEND_URL}/auth/profile`,
					{ user: username.toLowerCase() },
					undefined,
					authState.isLoggedIn
				);

				if (profileResult.success && profileResult.profileResponse) {
					const profile = profileResult.profileResponse;
					return {
						title: profile.displayName ?? profile.username,
						description: "@" + profile.username,
						avatar: profile.avatarUrl,
						href: `${PUBLIC_ACCOUNT_FRONTEND_URL}profile/${profile.userId}`
					} as Result;
				}
				return null;
			});

			const fetchedProfiles = (await Promise.all(profilePromises)).filter(
				(item): item is Result => item !== null
			);

			const mathResult = evaluateMathExpression(searchQuery);

			let mathNavResults: Result[] = [];
			if (mathResult) {
				mathNavResults.push({
					title: `${mathResult}`,
					description: `${searchQuery}`,
					icon: "calculate"
				});
			}

			await new Promise((resolve) => setTimeout(resolve, 100));

			if (fetchId !== currentFetchId) return;

			quickActionResults = matchedQuickActions;
			searchResults = [...mathNavResults, ...navResults, ...fetchedProfiles];
			fakeProcessing = false;
			showResults = true;
		} catch (error) {
			if (fetchId !== currentFetchId) return;
			console.error("Search failed:", error);
			fakeProcessing = false;
			showResults = false;
		}
	}

	// Debounce wrapper to trigger loading skeleton then call async search
	function triggerTimedSequence() {
		clearTimers();
		showResults = false;

		timer1 = setTimeout(async () => {
			if (!query.trim()) {
				fakeProcessing = false;
				return;
			}

			fakeProcessing = true; // Show Skeleton
			await performSearch(query, mentionedUsers);
		}, 200);
	}

	// Handle typing and detect '@'
	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		query = target.value;
		const cursorPosition = target.selectionStart || 0;

		hideAllViews();

		const textBeforeCursor = query.slice(0, cursorPosition);
		const lastAtIndex = textBeforeCursor.lastIndexOf("@");

		if (lastAtIndex !== -1) {
			const charBeforeAt = lastAtIndex > 0 ? textBeforeCursor[lastAtIndex - 1] : " ";
			if (charBeforeAt === " ") {
				const searchTerm = textBeforeCursor.slice(lastAtIndex + 1);
				if (!searchTerm.includes(" ")) {
					showDropdown = true;
					mentionSearchQuery = searchTerm;
					selectedIndex = 0;
					return;
				}
			}
		}

		resetMentionState();
		triggerTimedSequence();
	}

	function selectOption(option: (typeof MENTION_OPTIONS)[number]) {
		if (!inputRef) return;
		const cursorPosition = inputRef.selectionStart || 0;
		const textBeforeCursor = query.slice(0, cursorPosition);
		const textAfterCursor = query.slice(cursorPosition);
		const lastAtIndex = textBeforeCursor.lastIndexOf("@");

		const replacement = `${option.label} `;
		query = textBeforeCursor.slice(0, lastAtIndex) + replacement + textAfterCursor;

		resetMentionState();

		const newCursorPos = lastAtIndex + replacement.length;
		setTimeout(() => {
			inputRef?.setSelectionRange(newCursorPos, newCursorPos);
			inputRef?.focus();
		}, 0);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (showDropdown && filteredOptions.length > 0) {
			if (e.key === "ArrowDown") {
				e.preventDefault();
				selectedIndex = (selectedIndex + 1) % filteredOptions.length;
				return;
			} else if (e.key === "ArrowUp") {
				e.preventDefault();
				selectedIndex = (selectedIndex - 1 + filteredOptions.length) % filteredOptions.length;
				return;
			} else if (e.key === "Enter") {
				e.preventDefault();
				const option = filteredOptions[selectedIndex];
				if (option) {
					selectOption(option);
				}
				return;
			} else if (e.key === "Escape") {
				showDropdown = false;
				return;
			}
		}

		if (e.key === "Enter") {
			e.preventDefault();
			clearTimers();

			if (!query.trim()) return;

			fakeProcessing = true;
			showResults = false;

			performSearch(query, mentionedUsers);
		}
	}

	// 1. Global shortcut to OPEN the palette (active only when closed)
	useShortcut("ctrl+k", open, {
		name: "Open Command Palette",
		description: "Open Command Palette",
		preventDefault: true,
		active: () => !isOpen
	});

	// 2. Local shortcut to CLOSE the palette with Escape (active only when open)
	useShortcut("escape", onclose, {
		name: "Close Command Palette",
		description: "Close Command Palette",
		preventDefault: true,
		active: () => isOpen
	});

	// 3. Mobile back button and history state management when open
	$effect(() => {
		if (!isOpen) return;

		history.pushState({ commandPaletteOpen: true }, "");

		const handlePopState = () => {
			isOpen = false;
		};

		window.addEventListener("popstate", handlePopState);

		if (query.length > 0) {
			performSearch(query, mentionedUsers);
		}

		return () => {
			window.removeEventListener("popstate", handlePopState);
			if (history.state?.commandPaletteOpen) {
				history.back();
			}
		};
	});
</script>

{#if isOpen}
	<Blanket centerContent={false} onclick={onclose}>
		<Flex
			alignItems="start"
			justifyContent="center"
			height="100dvh"
			width="100dvw"
			marginTop="giant">
			<div
				use:focusTrap={true}
				use:shortcutTrap
				role="dialog"
				aria-modal="true"
				class={styles.wrapper}>
				<div class={styles.inputContainer}>
					<input
						bind:this={inputRef}
						bind:value={query}
						oninput={handleInput}
						onkeydown={handleKeydown}
						placeholder="Search pages, actions, or type '@'..."
						class={styles.baseCommandPallete} />
				</div>

				{#if showDropdown && filteredOptions.length > 0}
					<div class={styles.dropdownContainer}>
						{#each filteredOptions as option, index}
							<button
								type="button"
								class={styles.dropdownItem}
								data-selected={index === selectedIndex}
								onclick={() => selectOption(option)}
								onmouseenter={() => (selectedIndex = index)}>
								<span class={styles.dropdownLabel}>{option.label}</span>
								<span class={styles.dropdownDescription}>
									{option.description}
								</span>
							</button>
						{/each}
					</div>
				{:else}
					{#if fakeProcessing}
						<div class={styles.dropdownContainer}>
							<Flex padding="small" direction="column" gap="small">
								<Skeleton width="100%" height="4rem" />
								<Skeleton width="100%" height="4rem" />
								<Skeleton width="100%" height="4rem" />
							</Flex>
						</div>
					{/if}

					{#if showResults}
						<div class={styles.dropdownContainer}>
							<Flex padding="medium" direction="column" gap="small">
								<span style="font-weight: bold; font-size: 0.9rem;">Search Results:</span>
								<br />
								{#if quickActionResults.length > 0}
									{#each quickActionResults as action}
										<Flex direction="row" gap="medium" alignItems="center" width="100%">
											{#if action.href}
												<Anchor href={action.href} style="width: 100%;">
													<Flex direction="row" gap="medium" alignItems="center">
														{#if action.icon}
															<Icon icon={action.icon} size="xlarge" />
														{/if}
														<Flex direction="column">
															<p
																style="font-size: {token.global.font.size
																	.medium}; font-weight: {token.global.font.weight.bold}">
																{action.title}
															</p>
															{#if action.description}
																<p style="font-size: {token.global.font.size.small}">
																	{action.description}
																</p>
															{/if}
														</Flex>
													</Flex>
												</Anchor>
											{:else}
												<button
													type="button"
													style="cursor: pointer; width: 100%; display: flex; background: none; border: none; padding: 0; text-align: left; color: inherit;"
													onclick={action.action}>
													<Flex direction="row" gap="medium" alignItems="center">
														{#if action.icon}
															<Icon icon={action.icon} size="xlarge" />
														{/if}
														<Flex direction="column">
															<p
																style="font-size: {token.global.font.size
																	.medium}; font-weight: {token.global.font.weight.bold}">
																{action.title}
															</p>
															{#if action.description}
																<p>{action.description}</p>
															{/if}
														</Flex>
													</Flex>
												</button>
											{/if}
										</Flex>
									{/each}
									<br />
								{/if}

								<br />
								{#each searchResults as result}
									<Flex direction="row" gap="medium" alignItems="center">
										{#if result.href}
											<Anchor href={result.href}>
												<Flex direction="row" gap="medium" alignItems="center">
													{#if result.icon}
														<Icon icon={result.icon} size="xlarge" />
													{/if}
													{#if result.avatar}
														<Avatar src={result.avatar} size="medium" />
													{/if}
													<Flex direction="column">
														<p
															style="font-size: {token.global.font.size.medium}; font-weight: {token
																.global.font.weight.bold}">
															{result.title}
														</p>
														<p style="font-size: {token.global.font.size.small}">
															{result.description}
														</p>
													</Flex>
												</Flex>
											</Anchor>
										{:else}
											<Flex direction="row" gap="medium" alignItems="center">
												{#if result.icon}
													<Icon icon={result.icon} size="xlarge" />
												{/if}
												<Flex direction="column">
													<p
														style="font-size: {token.global.font.size.medium}; font-weight: {token
															.global.font.weight.bold}">
														{result.title}
													</p>
													<p>{result.description}</p>
												</Flex>
											</Flex>
										{/if}
									</Flex>
								{/each}
								{#if searchResults.length === 0 && quickActionResults.length === 0}
									<Flex direction="row" gap="medium" alignItems="center">
										<Icon icon="search_off" size="xlarge" />
										<Flex direction="column">
											<p
												style="font-size: {token.global.font.size.xmedium}; font-weight: {token
													.global.font.weight.bold}">
												No results for
											</p>
											<p>{query}</p>
										</Flex>
									</Flex>
								{/if}
							</Flex>
						</div>
					{/if}
				{/if}
			</div>
		</Flex>
	</Blanket>
{/if}
