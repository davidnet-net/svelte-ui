import manifest from "$lib/internal/assets/downloads/manifest.json";

import type { PageServerLoad } from "./$types";

const contextGlob = import.meta.glob("$lib/internal/assets/downloads/llm-context/*", {
	eager: true,
	query: "?url",
	import: "default"
});

const instructionGlob = import.meta.glob(
	"$lib/internal/assets/downloads/llm-custom-instructions/*",
	{
		eager: true,
		query: "?url",
		import: "default"
	}
);

export const load: PageServerLoad = () => {
	const processGlob = (glob: Record<string, unknown>, sizes: Record<string, number>) => {
		return Object.entries(glob).map(([filePath, url]) => {
			const fileName = filePath.split("/").pop() ?? "";
			return {
				name: fileName,
				path: String(url),
				// Look up the size from our manifest
				size: sizes[fileName] ?? 0
			};
		});
	};

	return {
		contextFiles: processGlob(contextGlob, manifest.context),
		instructionFiles: processGlob(instructionGlob, manifest.instructions)
	};
};
