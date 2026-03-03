import { error, json } from "@sveltejs/kit";

import manifest from "$lib/changelog-manifest.json";

import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }: { url: URL }) => {
	const file = url.searchParams.get("file");

	if (!file) throw error(400, "File path required");

	const history = manifest[file as keyof typeof manifest];

	return json(history);
};
