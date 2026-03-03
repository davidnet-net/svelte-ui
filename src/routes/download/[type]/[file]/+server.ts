import fs from "node:fs";
import path from "node:path";

import { error } from "@sveltejs/kit";
import { createReadableStream } from "@sveltejs/kit/node";

import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params }: { params: Record<string, string> }) => {
	const { type, file } = params;

	const allowedTypes = ["llm-context", "llm-custom-instructions"];
	if (!allowedTypes.includes(type)) {
		throw error(400, "Invalid resource type");
	}

	const filePath = path.resolve("static", "downloads", type, file);

	if (!fs.existsSync(filePath)) {
		throw error(404, "File not found");
	}

	const stats = fs.statSync(filePath);
	const stream = createReadableStream(filePath);

	return new Response(stream, {
		headers: {
			// "attachment" forces the browser to download instead of preview
			"Content-Disposition": `attachment; filename="${file}"`,
			"Content-Type": "application/octet-stream",
			"Content-Length": stats.size.toString(),
			"Cache-Control": "no-cache"
		}
	});
};
