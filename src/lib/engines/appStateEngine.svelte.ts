interface sidebarOpen {
	sidebarOpen: boolean;
	isMobile: boolean;
}

export const appState: sidebarOpen = $state({
	sidebarOpen: false,
	isMobile: false
});
