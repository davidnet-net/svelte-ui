/* eslint-disable @typescript-eslint/no-explicit-any */
export async function getComponentRegistry() {
	// 1. Unified Scanner: Read raw text strings of all Svelte files and style loaders
	const rawSvelteModules = import.meta.glob("/src/lib/components/**/*.svelte", {
		query: "?raw",
		import: "default"
	});
	const styleModules = import.meta.glob("/src/lib/components/**/*.css.ts");

	const componentLogDump: Record<string, any> = {};

	for (const rawPath of Object.keys(rawSvelteModules)) {
		const sveltePath = rawPath.replace("?raw", "");

		if (sveltePath.includes("/lib_internal/")) {
			continue;
		}

		// 2. Extract clean component identifiers
		const fileName = sveltePath.split("/").pop() || "";
		let id = fileName.replace(".svelte", "").toLowerCase();

		const pathParts = sveltePath.split("/");
		const directoryPath = sveltePath.substring(0, sveltePath.lastIndexOf("/"));

		if (id === "index" && pathParts.length > 2) {
			id = pathParts![pathParts!.length - 2]!.toLowerCase();
		}

		const extractedProps: Record<string, any> = {};

		// --- PART A: INDESTRUCTIBLE SVELTE 5 PROPS EXTRACTOR ---
		try {
			const rawLoader = rawSvelteModules[rawPath] as () => Promise<string>;
			const rawSource = await rawLoader();

			// Match everything inside the destructured block regardless of spaces, newlines, or type annotations following it
			const propsBlockRegex =
				/(?:let|const)\s*\{([\s\S]*?)\}(?:\s*:\s*[a-zA-Z0-9_$]+)?\s*=\s*\$props\s*\(\s*\)/;
			const match = rawSource.match(propsBlockRegex);

			if (match && match[1]) {
				// Strip out multi-line and single-line comments completely
				const cleanBlock = match[1].replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "");

				// Track matching names accurately, stopping cleanly before default value assignments or inline type markers
				const propMatches = cleanBlock.matchAll(
					/(?:^|,|\n)\s*([a-zA-Z0-9_$]+)(?:\s*[:=]|\s*(?:,|$))/g
				);

				for (const propMatch of propMatches) {
					const propName = propMatch[1]!.trim();
					if (propName && propName !== "class" && propName !== "children") {
						extractedProps[propName] = "__TEXT_INPUT__";
					}
				}
			}

			// Fallback: Classic Svelte 4 export let properties
			const legacyMatches = rawSource.matchAll(/export\s+let\s+([a-zA-Z0-9_$]+)/g);
			for (const legacyMatch of legacyMatches) {
				if (legacyMatch[1] && legacyMatch[1] !== "class" && legacyMatch[1] !== "children") {
					extractedProps[legacyMatch[1]] = "__TEXT_INPUT__";
				}
			}
		} catch (err) {
			console.error(`Failed parsing raw svelte source for non-styling props on ${id}:`, err);
		}

		// --- PART B: OVERWRITE WITH DESIGN SYSTEM STYLES (SELECT DROP-DOWNS) ---
		const matchingStylePath = Object.keys(styleModules).find((p) => p.startsWith(directoryPath));

		if (matchingStylePath) {
			try {
				const styleLoader = styleModules[matchingStylePath] as () => Promise<any>;
				const styleModule = await styleLoader();

				// LAYER A: Explicit style variance blocks
				const stylesObject = styleModule.styles || styleModule.iconStyles;
				if (stylesObject) {
					for (const [propName, variantsMap] of Object.entries(stylesObject)) {
						if (variantsMap && typeof variantsMap === "object") {
							const keys = Object.keys(variantsMap);
							if (keys.length > 0) {
								extractedProps[propName] = keys; // Upgrades text input string to selection array
							}
						}
					}
				}

				// LAYER B: Flattened style exports
				if (Object.values(extractedProps).filter((v) => Array.isArray(v)).length === 0) {
					for (const [key, value] of Object.entries(styleModule)) {
						if (value && typeof value === "object" && key !== "styles" && key !== "iconStyles") {
							if (!("properties" in value)) {
								extractedProps[key] = Object.keys(value);
							}
						}
					}
				}

				// LAYER C: Sprinkles metadata inspection
				for (const value of Object.values(styleModule)) {
					if (value && typeof value === "function" && "properties" in value) {
						const sprinkleFunc = value as any;

						if (sprinkleFunc.properties instanceof Set || Array.isArray(sprinkleFunc.properties)) {
							for (const propName of sprinkleFunc.properties) {
								if (!extractedProps[propName] || extractedProps[propName] === "__TEXT_INPUT__") {
									extractedProps[propName] = [];
								}
							}
						} else if (
							typeof sprinkleFunc.properties === "object" &&
							sprinkleFunc.properties !== null
						) {
							for (const [propName, allowedValues] of Object.entries(sprinkleFunc.properties)) {
								if (Array.isArray(allowedValues)) {
									extractedProps[propName] = allowedValues.map((v) => String(v));
								} else if (allowedValues && typeof allowedValues === "object") {
									extractedProps[propName] = Object.keys(allowedValues);
								}
							}
						}
					}
				}
			} catch (err) {
				console.error(`Failed loading styles for ${id}:`, err);
			}
		}

		// Final sanitation checks
		delete extractedProps["class"];
		delete extractedProps["children"];

		componentLogDump[id] = {
			componentPath: sveltePath,
			stylePath: matchingStylePath || "None found",
			dynamicProps: extractedProps
		};
	}

	return componentLogDump;
}
