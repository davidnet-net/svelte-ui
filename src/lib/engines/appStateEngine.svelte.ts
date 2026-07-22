import { afterNavigate, goto } from "$app/navigation";
import { resolve } from "$app/paths";
import { PUBLIC_ACCOUNT_FRONTEND_URL, PUBLIC_BACKEND_URL } from "$env/static/public";
import { generateUUIDv7, type UUIDv7Type } from "$lib/utils/crypto";

interface AppStateType {
	sidebarOpen: boolean;
	// Make sure isMobile stays true when isTinyMobile is true due logic that just checks for smaller screens
	// is mobile just checks screenWidth
	isMobile: boolean;
	isTinyMobile: boolean;
	viteConnected: boolean;
	isOffline: boolean;
	backendURL: string;
	accountFrontendURL: string;
	hideNavigation: boolean;
	tabID: (UUIDv7Type & { __brand: "tabID" }) | undefined;
	systemPreference: {
		darkMode: boolean;
		highContrast: boolean;
		reduceMotion: boolean;
	};
	previousPage: string | undefined;
	historyStack: string[];
}

export const appState: AppStateType = $state({
	sidebarOpen: false,
	isTinyMobile: false,
	isMobile: false,
	viteConnected: true,
	isOffline: false,
	hideNavigation: false,
	tabID: undefined,
	backendURL: PUBLIC_BACKEND_URL,
	accountFrontendURL: PUBLIC_ACCOUNT_FRONTEND_URL,
	systemPreference: {
		darkMode: false,
		highContrast: false,
		reduceMotion: false
	},
	previousPage: undefined,
	historyStack: []
});

export async function initAppState() {
	if (typeof window === "undefined") return;

	appState.tabID = generateUUIDv7() as (UUIDv7Type & { __brand: "tabID" }) | undefined;

	if (import.meta.hot) {
		import.meta.hot.on("vite:ws:disconnect", () => (appState.viteConnected = false));
		import.meta.hot.on("vite:ws:connect", () => (appState.viteConnected = true));
	} else {
		appState.viteConnected = false;
	}

	let offlineTimer: ReturnType<typeof setTimeout> | null = null;
	const updateOnlineStatus = () => {
		if (navigator.onLine) {
			if (offlineTimer) {
				clearTimeout(offlineTimer);
				offlineTimer = null;
			}
			appState.isOffline = false;
		} else {
			// 3 seconds to prevent micro drops.
			if (!offlineTimer) {
				offlineTimer = setTimeout(() => {
					appState.isOffline = true;
				}, 3000);
			}
		}
	};

	window.addEventListener("online", updateOnlineStatus);
	window.addEventListener("offline", updateOnlineStatus);
	updateOnlineStatus();

	const watchMedia = (query: string, callback: (matches: boolean) => void) => {
		const mql = window.matchMedia(query);
		mql.addEventListener("change", (e) => callback(e.matches));
		callback(mql.matches);
	};

	watchMedia("(max-width: 768px)", (matches) => (appState.isMobile = matches));
	watchMedia("(max-width: 480px)", (matches) => (appState.isTinyMobile = matches));

	watchMedia("(prefers-color-scheme: dark)", (matches) => {
		appState.systemPreference.darkMode = matches;
	});
	watchMedia("(prefers-contrast: more)", (matches) => {
		appState.systemPreference.highContrast = matches;
	});
	watchMedia("(prefers-reduced-motion: reduce)", (matches) => {
		appState.systemPreference.reduceMotion = matches;
	});

	afterNavigate((navigation) => {
		const toUrl = navigation.to?.url.pathname;
		if (!toUrl) return;

		const currentStack = appState.historyStack;
		if (currentStack[currentStack.length - 1] !== toUrl) {
			appState.historyStack.push(toUrl);
			if (appState.historyStack.length > 1) {
				appState.previousPage = appState.historyStack[appState.historyStack.length - 2];
			}
		}
	});
}

/**
 * Navigates back to the previous page internally using `goto`.
 * Falls back to browser `history.back()` or a default path if no internal history exists.
 */
export async function navigateBack(defaultFallback = "/") {
	if (appState.historyStack.length > 1) {
		appState.historyStack.pop();
		const targetPath = appState.historyStack.pop();

		if (targetPath) {
			await goto(resolve(targetPath, {}));
			return;
		}
	}

	if (typeof window !== "undefined" && window.history.length > 1) {
		window.history.back();
	} else {
		await goto(resolve(defaultFallback, {}));
	}
}
