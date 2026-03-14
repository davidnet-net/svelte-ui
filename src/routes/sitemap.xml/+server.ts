import { navigationData, type NavigationItem } from "$lib/internal/navigationData.svelte";

import type { RequestHandler } from "./$types";

function flattenNavigation(
	items: NavigationItem[]
): Array<{ href: string; priority: number; changefreq: string }> {
	const flat: Array<{ href: string; priority: number; changefreq: string }> = [];

	for (const item of items) {
		flat.push({
			href: item.href,
			priority: item.priority ?? 0.5,
			changefreq: item.changefreq ?? "weekly"
		});

		if (item.children) {
			flat.push(...flattenNavigation(item.children));
		}
	}
	return flat;
}

export const GET: RequestHandler = ({ url }) => {
	const domain = url.origin;
	const entries = flattenNavigation(navigationData);

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
	.map(
		(entry) => `  <url>
    <loc>${domain}${entry.href}</loc>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`
	)
	.join("\n")}
</urlset>`.trim();

	return new Response(sitemap, {
		headers: {
			"Content-Type": "application/xml",
			"Cache-Control": "max-age=0, s-maxage=3600"
		}
	});
};
