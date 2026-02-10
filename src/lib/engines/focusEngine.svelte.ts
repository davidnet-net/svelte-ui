const FOCUSABLE_SELECTORS = [
	"a[href]",
	"area[href]",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"button:not([disabled])",
	"iframe",
	'[tabindex]:not([tabindex="-1"])',
	"[contenteditable]"
];

/**
 * Focuses the first available element within the node.
 */
function focusFirstElement(node: HTMLElement) {
	const first = node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS.join(","))[0];
	first.focus();
}

/**
 * Svelte Action to trap focus within a DOM element.
 * Useful for modals, sidebars, and overlays.
 * * @param node - The HTMLElement to trap focus within.
 * @param active - A boolean indicating if the trap is active.
 * @remark DO NOT FORGET TO USE useKeyboardTrap!
 */
export function focusTrap(node: HTMLElement, active = true) {
	let previousActiveElement: HTMLElement | null = null;

	function handleKeyDown(event: KeyboardEvent) {
		if (!active || event.key !== "Tab") return;

		const focusableElements = Array.from(
			node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS.join(","))
		);

		if (focusableElements.length === 0) {
			event.preventDefault();
			return;
		}

		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		if (event.shiftKey && document.activeElement === firstElement) {
			event.preventDefault();
			lastElement.focus();
		} else if (!event.shiftKey && document.activeElement === lastElement) {
			event.preventDefault();
			firstElement.focus();
		}
	}

	// Effect-like logic for initialization
	if (active) {
		previousActiveElement = document.activeElement as HTMLElement;
		// We use a small timeout or requestAnimationFrame to ensure the
		// DOM is ready before trying to move focus.
		requestAnimationFrame(() => focusFirstElement(node));
		window.addEventListener("keydown", handleKeyDown);
	}

	return {
		update(newActive: boolean) {
			active = newActive;
			if (active) {
				previousActiveElement = document.activeElement as HTMLElement;
				focusFirstElement(node);
				window.addEventListener("keydown", handleKeyDown);
			} else {
				window.removeEventListener("keydown", handleKeyDown);
				previousActiveElement?.focus();
			}
		},
		destroy() {
			window.removeEventListener("keydown", handleKeyDown);
			previousActiveElement?.focus();
		}
	};
}
