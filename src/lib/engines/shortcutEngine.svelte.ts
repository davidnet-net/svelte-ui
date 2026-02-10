import { untrack } from "svelte";
import { SvelteMap } from "svelte/reactivity";

const isMac = typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
const isLinux = typeof navigator !== "undefined" && /Linux/.test(navigator.userAgent);

export type Handler = (e: KeyboardEvent) => void;

export interface ShortcutDefinition {
	id: string;
	display: string[];
	original: string;
}

export interface ShortcutOptions {
	preventDefault?: boolean;
	name?: string;
	description?: string;
	/**
	 * Whether the shortcut is currently active.
	 * Pass a function `() => boolean` for reactive toggling.
	 * @default true
	 */
	active?: boolean | (() => boolean);
}

interface RegisteredShortcut {
	handler: Handler;
	name?: string;
	description?: string;
	display: string[];
	original: string;
	sequence: number;
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

const handlers = new SvelteMap<string, RegisteredShortcut[]>();

let currentSequence = 0;
const trapStack: number[] = [];

const handleKeydown = (e: KeyboardEvent) => {
	const id = getEventId(e);
	const stack = handlers.get(id);

	if (stack && stack.length > 0) {
		const activeEntry = stack[stack.length - 1];

		// Check for active traps
		if (trapStack.length > 0) {
			const activeTrapSequence = trapStack[trapStack.length - 1];
			// If the handler was registered BEFORE the current trap, ignore it.
			if (activeEntry.sequence < activeTrapSequence) {
				return;
			}
		}

		activeEntry.handler(e);
	}
};

if (typeof window !== "undefined") {
	window.addEventListener("keydown", handleKeydown);
}

function register(id: string, entry: RegisteredShortcut) {
	if (!handlers.has(id)) {
		handlers.set(id, []);
	}

	const stack = handlers.get(id)!;
	stack.push(entry);

	return () => {
		const index = stack.indexOf(entry);
		if (index !== -1) stack.splice(index, 1);
		if (stack.length === 0) handlers.delete(id);
	};
}

export function useShortcut(
	combo: string | (() => string),
	callback: Handler,
	options: ShortcutOptions = {}
) {
	const { preventDefault = true, name, description, active = true } = options;

	const definition = $derived.by(() => {
		const raw = typeof combo === "function" ? combo() : combo;
		return assembleShortcut(raw);
	});

	$effect(() => {
		const isEnabled = typeof active === "function" ? active() : active;

		if (!isEnabled) return;

		const entry: RegisteredShortcut = {
			handler: (e) => {
				if (preventDefault) e.preventDefault();
				callback(e);
			},
			name,
			description,
			display: definition.display,
			original: definition.original,
			sequence: ++currentSequence // Assign current sequence
		};

		// untrack prevents the effect from re-running when `handlers` is modified
		// We still track `definition.id` implicitly because we pass it in,
		// ensuring re-registration if the keys change.
		return untrack(() => register(definition.id, entry));
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

/**
 * Action to trap shortcuts within the current context.
 * Blocks any shortcuts registered prior to this element's activation.
 * @param node - The HTML element (unused logic-wise, but ties lifecycle to DOM)
 * @param active - Whether the trap is currently active
 */
export function shortcutTrap(node: HTMLElement, active = true) {
	let trapSequence: number | null = null;

	function activate() {
		if (trapSequence !== null) return;
		trapSequence = ++currentSequence;
		trapStack.push(trapSequence);
	}

	function deactivate() {
		if (trapSequence === null) return;
		const index = trapStack.indexOf(trapSequence);
		if (index !== -1) trapStack.splice(index, 1);
		trapSequence = null;
	}

	if (active) activate();

	return {
		update(newActive: boolean) {
			if (newActive && !trapSequence) {
				activate();
			} else if (!newActive && trapSequence) {
				deactivate();
			}
		},
		destroy() {
			deactivate();
		}
	};
}

export function getShortcuts() {
	const items = [];
	for (const [id, stack] of handlers) {
		if (stack.length > 0) {
			const entry = stack[stack.length - 1];
			items.push({
				id,
				display: entry.display,
				original: entry.original,
				name: entry.name,
				description: entry.description
			});
		}
	}
	return items;
}
