// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			lang: "en" | "nl";
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	const __DDS_INFO__: {
		commitHash: string;
		commitUrl: string;
		buildTime: string;
		version: string;
	};
}

export {};
