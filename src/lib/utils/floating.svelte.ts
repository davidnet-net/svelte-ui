import type { Action } from "svelte/action";

/**
 * Defines the allowed placements for floating elements relative to their trigger.
 */
export type Placement =
	| "top-start"
	| "top"
	| "top-end"
	| "bottom-start"
	| "bottom"
	| "bottom-end"
	| "left-start"
	| "left"
	| "left-end"
	| "right-start"
	| "right"
	| "right-end";

export interface FloatingParams {
	/** The reference element to position against. */
	trigger: HTMLElement | null;
	/** The preferred placement. Defaults to 'bottom-start'. */
	placement?: Placement;
	/** If true, disables viewport collision detection and flipping. */
	forcePlacement?: boolean;
	/** Space in pixels between the trigger and the floating element. */
	offset?: number;
}

/**
 * Action that calculates and applies optimal positioning styles
 * for a floating element relative to its trigger, keeping it within the viewport.
 */
export const floatingPosition: Action<HTMLElement, FloatingParams> = (node, params) => {
	let currentParams = params;

	const updatePosition = () => {
		const {
			trigger,
			placement = "bottom-start",
			forcePlacement = false,
			offset = 8
		} = currentParams;

		if (!trigger) return;

		const triggerRect = trigger.getBoundingClientRect();
		const floatingRect = node.getBoundingClientRect();

		let finalPlacement = placement;

		// Viewport collision detection
		if (!forcePlacement) {
			const viewportWidth = window.innerWidth;
			const viewportHeight = window.innerHeight;

			let [side, alignment] = placement.split("-") as [string, string | undefined];

			// 1. Vertical main axis flipping (top/bottom)
			if (side === "bottom" && triggerRect.bottom + offset + floatingRect.height > viewportHeight) {
				if (triggerRect.top - offset - floatingRect.height > 0) side = "top";
			} else if (side === "top" && triggerRect.top - offset - floatingRect.height < 0) {
				if (triggerRect.bottom + offset + floatingRect.height < viewportHeight) side = "bottom";
			}

			// 2. Horizontal main axis flipping (left/right)
			if (side === "right" && triggerRect.right + offset + floatingRect.width > viewportWidth) {
				if (triggerRect.left - offset - floatingRect.width > 0) side = "left";
			} else if (side === "left" && triggerRect.left - offset - floatingRect.width < 0) {
				if (triggerRect.right + offset + floatingRect.width < viewportWidth) side = "right";
			}

			// 3. Cross axis alignment flipping (start/end)
			if (side === "top" || side === "bottom") {
				// If aligned start (left), but overflowing right
				if (alignment === "start" && triggerRect.left + floatingRect.width > viewportWidth) {
					alignment = "end";
				}
				// If aligned end (right), but overflowing left
				else if (alignment === "end" && triggerRect.right - floatingRect.width < 0) {
					alignment = "start";
				}
			} else if (side === "left" || side === "right") {
				// If aligned start (top), but overflowing bottom
				if (alignment === "start" && triggerRect.top + floatingRect.height > viewportHeight) {
					alignment = "end";
				}
				// If aligned end (bottom), but overflowing top
				else if (alignment === "end" && triggerRect.bottom - floatingRect.height < 0) {
					alignment = "start";
				}
			}

			// Reconstruct the final placement string
			finalPlacement = (alignment ? `${side}-${alignment}` : side) as Placement;
		}

		// Apply styles based on the final calculated placement
		node.style.top = "auto";
		node.style.bottom = "auto";
		node.style.left = "auto";
		node.style.right = "auto";
		node.style.transform = "none";

		const [finalSide, finalAlignment] = finalPlacement.split("-");

		// Set main axis styles
		if (finalSide === "bottom") {
			node.style.top = `calc(100% + ${offset}px)`;
		} else if (finalSide === "top") {
			node.style.bottom = `calc(100% + ${offset}px)`;
		} else if (finalSide === "right") {
			node.style.left = `calc(100% + ${offset}px)`;
			node.style.top = "0";
		} else if (finalSide === "left") {
			node.style.right = `calc(100% + ${offset}px)`;
			node.style.top = "0";
		}

		// Set cross axis (alignment) styles
		if (finalSide === "top" || finalSide === "bottom") {
			if (finalAlignment === "start") node.style.left = "0";
			else if (finalAlignment === "end") node.style.right = "0";
			else {
				node.style.left = "50%";
				node.style.transform = "translateX(-50%)";
			}
		} else if (finalSide === "left" || finalSide === "right") {
			if (finalAlignment === "end") {
				node.style.top = "auto";
				node.style.bottom = "0";
			} else if (!finalAlignment) {
				node.style.top = "50%";
				node.style.transform = "translateY(-50%)";
			}
		}
	};

	updatePosition();
	window.addEventListener("resize", updatePosition);
	window.addEventListener("scroll", updatePosition, true);

	return {
		update(newParams) {
			currentParams = newParams;
			updatePosition();
		},
		destroy() {
			window.removeEventListener("resize", updatePosition);
			window.removeEventListener("scroll", updatePosition, true);
		}
	};
};
