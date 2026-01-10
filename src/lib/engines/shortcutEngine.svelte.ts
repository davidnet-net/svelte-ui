import { SvelteMap } from "svelte/reactivity";

const isMac = typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
const isLinux = typeof navigator !== "undefined" && /Linux/.test(navigator.userAgent);

export type Handler = (e: KeyboardEvent) => void;

export interface ShortcutDefinition {
	id: string;
	display: string[];
	original: string;
}

const ALIASES: Record<string, string> = {
	control: "ctrl",
	ctl: "ctrl",
	cmd: "meta",
	command: "meta",
	win: "meta",
	windows: "meta",
	opt: "alt",
	option: "alt",
	esc: "escape",
	ins: "insert",
	del: "delete",
	return: "enter"
};

const SYMBOLS: Record<string, string> = {
	ctrl: "Ctrl",
	meta: isMac ? "⌘" : isLinux ? "Super" : "Win",
	alt: isMac ? "⌥" : "Alt",
	shift: isMac ? "⇧" : "Shift",
	enter: "↵",
	escape: "Esc",
	backspace: "⌫",
	tab: "↹",
	capslock: "Caps"
};

function normalizeKey(key: string): string {
	const lower = key.toLowerCase().trim();
	return ALIASES[lower] || lower;
}

export function assembleShortcut(input: string): ShortcutDefinition {
	const parts = input.split("+").map(normalizeKey);

	const modifiers = parts.filter((p) => ["ctrl", "meta", "alt", "shift"].includes(p)).sort();
	const keys = parts.filter((p) => !["ctrl", "meta", "alt", "shift"].includes(p));

	const id = [...modifiers, ...keys].join("+");

	const display = [...modifiers, ...keys].map((part) => {
		if (SYMBOLS[part]) return SYMBOLS[part];

		if (part.length === 1) return part.toUpperCase();

		return part.charAt(0).toUpperCase() + part.slice(1);
	});

	return { id, display, original: input };
}

export function getEventId(e: KeyboardEvent): string {
	const parts: string[] = [];
	if (e.ctrlKey) parts.push("ctrl");
	if (e.metaKey) parts.push("meta");
	if (e.altKey) parts.push("alt");
	if (e.shiftKey) parts.push("shift");

	const key = e.key.toLowerCase();
	if (!["control", "meta", "alt", "shift"].includes(key)) {
		parts.push(normalizeKey(key));
	}

	return parts.join("+");
}

const handlers = new SvelteMap<string, Handler[]>();

const handleKeydown = (e: KeyboardEvent) => {
	const id = getEventId(e);
	const stack = handlers.get(id);

	if (stack && stack.length > 0) {
		const activeHandler = stack[stack.length - 1];
		activeHandler(e);
	}
};

if (typeof window !== "undefined") {
	window.addEventListener("keydown", handleKeydown);
}

function register(id: string, handler: Handler) {
	if (!handlers.has(id)) {
		handlers.set(id, []);
	}

	const stack = handlers.get(id)!;
	stack.push(handler);

	return () => {
		const index = stack.indexOf(handler);
		if (index !== -1) stack.splice(index, 1);
		if (stack.length === 0) handlers.delete(id);
	};
}

export function useShortcut(
	combo: string | (() => string),
	callback: Handler,
	options = { preventDefault: true }
) {
	const definition = $derived.by(() => {
		const raw = typeof combo === "function" ? combo() : combo;
		return assembleShortcut(raw);
	});

	$effect(() => {
		const cleanup = register(definition.id, (e) => {
			if (options.preventDefault) e.preventDefault();
			callback(e);
		});

		return cleanup;
	});

	return {
		get keys() {
			return definition.display;
		},
		get original() {
			return definition.original;
		}
	};
}
