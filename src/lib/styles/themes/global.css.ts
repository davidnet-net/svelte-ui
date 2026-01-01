import { createGlobalTheme, createThemeContract } from "@vanilla-extract/css";
import { interFontName } from "../fonts.css.ts";

export const global = createGlobalTheme(':root', {
  font: {
    family: {
      sans: `"${interFontName}", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`,
      mono: 'monospace',
    },
    weight: {
      regular: '400',
      bold: '700',
    }
  }
  // Todo:
  // Spacing
  // Rounding
});