interface sidebarOpen {
	sidebarOpen: boolean;
	isMobile: boolean;
	viteConnected: boolean;
	isOffline: boolean;
}

export const appState: sidebarOpen = $state({
	sidebarOpen: false,
	isMobile: false,
	viteConnected: true,
	isOffline: false
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

	// Network Status
	window.addEventListener("online", () => {
		appState.isOffline = false;
	});
	window.addEventListener("offline", () => {
		appState.isOffline = true;
	});
}
