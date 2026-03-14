import type { Snippet } from "svelte";

export interface fieldContextType {
	fieldID: string;
	name: string;
	required: boolean;
	invalid: string | undefined;
	statusbar?: {
		snippet: Snippet | undefined;
	};
	invalidOveride?: {
		invalid: string | undefined;
	};
}
