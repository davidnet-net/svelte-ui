import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { token } from "../styles/themes/schema.css.ts";

export const buttonRecipe = recipe({
	base: {
		border: "none",
		cursor: "pointer",
		borderRadius: "6px",
		fontWeight: 600,
		transition: "all 0.2s",
		display: "inline-flex",
		alignItems: "center",
		fontFamily: "inherit",

		// Use tokens from the theme contract
		padding: token.space.md
	},

	variants: {
		kind: {
			primary: {
				backgroundColor: token.colors.brand,
				color: "#ffffff",
				":hover": { opacity: 0.9 }
			},
			secondary: {
				backgroundColor: token.colors.bg.secondary,
				color: token.colors.text.primary,
				":hover": { backgroundColor: "#e2e8f0" } // manual color or another token
			},
			ghost: {
				backgroundColor: "transparent",
				color: token.colors.text.secondary,
				":hover": {
					backgroundColor: token.colors.bg.secondary,
					color: token.colors.text.primary
				}
			}
		},
		size: {
			small: { padding: token.space.sm, fontSize: "0.875rem" },
			medium: { padding: token.space.md, fontSize: "1rem" },
			large: { padding: token.space.lg, fontSize: "1.125rem" }
		}
	},

	defaultVariants: {
		kind: "primary",
		size: "medium"
	}
});

// Export the type for use in Svelte props
export type ButtonVariants = RecipeVariants<typeof buttonRecipe>;
