interface AppStateType {
	sidebarOpen: boolean;
	isMobile: boolean;
	isTinyMobile: boolean;
	viteConnected: boolean;
	isOffline: boolean;
	hideNavigation: boolean;
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
	systemPreference: {
		darkMode: false,
		highContrast: false,
		reduceMotion: false
	}
});

export async function initAppState() {
	if (typeof window === "undefined") return;

	// --- Vite connection ---
	if (import.meta.hot) {
		import.meta.hot.on("vite:ws:disconnect", () => {
			appState.viteConnected = false;
		});

		import.meta.hot.on("vite:ws:connect", () => {
			appState.viteConnected = true;
		});
	} else {
		appState.viteConnected = false;
	}

	// Is mobile
	const mediaQuery = window.matchMedia("(max-width: 768px)");
	mediaQuery.onchange = (event) => (appState.isMobile = event.matches);
	appState.isMobile = mediaQuery.matches;

	// Is tiny mobile
	const tinyMediaQuery = window.matchMedia("(max-width: 480px)");
	appState.isTinyMobile = tinyMediaQuery.matches;

	const tinyHandler = (e: MediaQueryListEvent) => {
		appState.isTinyMobile = e.matches;
	};
	tinyMediaQuery.addEventListener("change", tinyHandler);

	// Network Status
	// --- Network Status ---
	window.addEventListener("online", () => {
		appState.isOffline = false;
	});
	window.addEventListener("offline", () => {
		appState.isOffline = true;
	});
	appState.isOffline = !navigator.onLine;

	// --- Media Query Tracking ---

	/** * Helper to setup a media query listener and set initial value.
	 * @param query The media query string.
	 * @param callback Function to update the specific state property.
	 */
	const watchMedia = (query: string, callback: (matches: boolean) => void) => {
		const mql = window.matchMedia(query);
		mql.onchange = (e) => callback(e.matches);
		callback(mql.matches);
	};

	// Mobile check
	watchMedia("(max-width: 768px)", (matches) => {
		appState.isMobile = matches;
	});

	// Dark Mode preference
	watchMedia("(prefers-color-scheme: dark)", (matches) => {
		appState.systemPreference.darkMode = matches;
	});

	// High Contrast preference
	watchMedia("(prefers-contrast: more)", (matches) => {
		appState.systemPreference.highContrast = matches;
	});

	// Reduced Motion preference
	watchMedia("(prefers-reduced-motion: reduce)", (matches) => {
		appState.systemPreference.reduceMotion = matches;
	});
}
