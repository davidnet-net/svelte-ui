interface sidebarOpen {
	sidebarOpen: boolean;
	isMobile: boolean;
	isTinyMobile: boolean;
	viteConnected: boolean;
	isOffline: boolean;
	hideNavigation: boolean;
}

export const appState: sidebarOpen = $state({
	sidebarOpen: false,
	isTinyMobile: false,
	isMobile: false,
	viteConnected: true,
	isOffline: false,
	hideNavigation: false
});

export function initTrackers() {
	// Vite connection
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
	window.addEventListener("online", () => {
		appState.isOffline = false;
	});
	window.addEventListener("offline", () => {
		appState.isOffline = true;
	});
}
