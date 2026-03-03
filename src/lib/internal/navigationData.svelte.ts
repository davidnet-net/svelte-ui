import { page } from "$app/state";

/**
 * @typedef {Object} NavigationItem
 * @property {string} pageName.
 * @property {string} [description] - SEO meta description.
 * @property {string} href
 * @property {NavigationItem[]} [children]
 * @property {number} [priority] - SEO priority (0.0 to 1.0).
 * @property {'website' | 'article'} [ogType] - Open Graph type.
 * @property {'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'} [changefreq] - How often the content updates.
 */
export interface NavigationItem {
	pageName: string;
	href: string;
	description?: string;
	children?: NavigationItem[];
	priority?: number;
	ogType?: "website" | "article";
	changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
}

export const navigationData: NavigationItem[] = [
	{
		pageName: "Davidnet Design System",
		href: "/",
		priority: 1.0,
		changefreq: "daily",
		description:
			"Build consistent, high-quality Davidnet interfaces faster. The official source for our design patterns, components, and documentation."
	},
	{
		pageName: "Foundations",
		href: "/foundations",
		priority: 0.8,
		changefreq: "weekly",
		description:
			"Foundations define the user experiences. These include our tokens, guidelines, and visual styles: color, spacing, typography, and more.",
		children: [
			{
				pageName: "Design tokens",
				href: "/foundations/design-tokens",
				priority: 0.7,
				description: "Design tokens are the single source of truth in a Design System.",
				children: [
					{
						pageName: "Design token library",
						href: "/foundations/design-tokens/library",
						priority: 0.6,
						description:
							"This page shows all design tokens that are being used in the Davidnet Design System."
					}
				]
			}
		]
	},
	{
		pageName: "Tools",
		href: "/tools",
		priority: 0.8,
		changefreq: "weekly",
		description: "Tools for developers working with the Davidnet Design System.",
		children: [
			{
				pageName: "LLM Resources",
				href: "/tools/llm-resources",
				priority: 0.7,
				description: "Let AI write code that fits with our system design."
			}
		]
	}
];

export function findNavItem(items: NavigationItem[], path: string): NavigationItem | undefined {
	for (const item of items) {
		if (item.href === path) return item;
		if (item.children) {
			const found = findNavItem(item.children, path);
			if (found) return found;
		}
	}
	return undefined;
}

export function getCurrentPage() {
	const currentNavItem = $derived(findNavItem(navigationData, page.url.pathname));

	const ogType = $derived(currentNavItem?.ogType ?? "website");
	const title = $derived((currentNavItem?.pageName ?? "Davidnet Design System") + " | Davidnet");
	const description = $derived(
		currentNavItem?.description ?? "Documents the Davidnet Design System."
	);

	const domain = "https://design.davidnet.net";
	const fullUrl = $derived(`${domain}${page.url.pathname}`);
	const ogImage = "/dynamic-assets/og-default.svg";

	return {
		get title() {
			return title;
		},
		get description() {
			return description;
		},
		get fullUrl() {
			return fullUrl;
		},
		get ogImage() {
			return ogImage;
		},
		get ogType() {
			return ogType;
		}
	};
}
