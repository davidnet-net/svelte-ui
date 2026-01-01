import { globalFontFace, style } from '@vanilla-extract/css';

// FIX: Remove "Inter-4.1/" from the path
import interUrl from '../assets/Inter-4.1/InterVariable.woff2';
import interItalicUrl from '../assets/Inter-4.1/InterVariable-Italic.woff2';

export const interFontName = 'Inter';

globalFontFace(interFontName, {
  src: `url("${interUrl}") format("woff2")`, 
  fontDisplay: 'swap',
  fontWeight: '100 900',
  fontStyle: 'normal',
});

globalFontFace(interFontName, {
  src: `url("${interItalicUrl}") format("woff2")`,
  fontDisplay: 'swap',
  fontWeight: '100 900',
  fontStyle: 'italic',
});

export const tabularNums = style({
  fontVariantNumeric: 'tabular-nums',
});