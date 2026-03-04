import fs from "node:fs";
import path from "node:path";

const BASE_DIR = "static/downloads";
const resultDIR = "src/lib/internal/manifests";

const scanDir = (subDir) => {
	const fullPath = path.join(process.cwd(), BASE_DIR, subDir);
	if (!fs.existsSync(fullPath)) return {};

	return fs.readdirSync(fullPath).reduce((acc, name) => {
		const stats = fs.statSync(path.join(fullPath, name));
		// We map the filename to its size
		acc[name] = stats.size;
		return acc;
	}, {});
};

const manifest = {
	externalContext: scanDir("llm-external-context"),
	internalContext: scanDir("llm-internal-context"),
	instructions: scanDir("llm-custom-instructions")
};

fs.writeFileSync(
	path.join(process.cwd(), resultDIR, "downloads-manifest.json"),
	JSON.stringify(manifest, null, 2)
);

console.log("✅ Downloads manifest generated.");
