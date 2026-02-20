import { generateUUIDv7, type UUIDv7Type } from "$lib/utils/crypto";

interface AppStateType {
	sidebarOpen: boolean;
	// Make sure isMobile stays true when isTinyMobile is true due logic that just checks for smaller screens
	// is mobile just checks screenWidth
	isMobile: boolean;
	isTinyMobile: boolean;
	viteConnected: boolean;
	isOffline: boolean;
	hideNavigation: boolean;
	tabSessionID: (UUIDv7Type & { __brand: "tabSessionID" }) | undefined;
	systemPreference: {
		darkMode: boolean;
		highContrast: boolean;
		reduceMotion: boolean;
	};
}

export const appState: AppStateType = $state({
	sidebarOpen: false,
	isTinyMobile: false,
	isMobile: false,
	viteConnected: true,
	isOffline: false,
	hideNavigation: false,
	tabSessionID: undefined,
	systemPreference: {
		darkMode: false,
		highContrast: false,
		reduceMotion: false
	}
});

export async function initAppState() {
	if (typeof window === "undefined") return;

	appState.tabSessionID = generateUUIDv7() as
		| (UUIDv7Type & { __brand: "tabSessionID" })
		| undefined;

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
}
