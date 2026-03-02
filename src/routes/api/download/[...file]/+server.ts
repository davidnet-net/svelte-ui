import fs from "node:fs";
import path from "node:path";

import { error } from "@sveltejs/kit";

import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params }) => {
	const { file } = params;
	const safePath = path.join(process.cwd(), "src", "lib", "internal", "assets", "downloads", file);

	if (!fs.existsSync(safePath)) {
		throw error(404, "File not found");
	}

	const stream = fs.createReadStream(safePath);
	const stats = fs.statSync(safePath);

	// We convert the Node stream to a Web ReadableStream for SvelteKit
	// @ts-expect-error - Node streams are compatible with Response in modern versions
	return new Response(stream, {
		headers: {
			"Content-Type": "application/octet-stream",
			"Content-Disposition": `attachment; filename="${file}"`,
			"Content-Length": stats.size.toString()
		}
	});
};
