interface sidebarOpen {
	sidebarOpen: boolean;
	isMobile: boolean;
	viteConnected: boolean;
	isDevelopmentBuild: boolean;
}

export const appState: sidebarOpen = $state({
	sidebarOpen: false,
	isMobile: false,
	viteConnected: true,
	isDevelopmentBuild: import.meta.env.DEV
});
