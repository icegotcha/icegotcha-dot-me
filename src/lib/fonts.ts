// Inline style-object constants that apply each font family via CSS variables.
// Use these instead of Tailwind font utilities (see AGENT.MD).
//
// The CSS variables themselves are declared by the `next/font` loaders in
// `src/app/layout.tsx` (for the app) and by `.storybook/fonts.css` (for
// Storybook). This module stays free of `next/font` so importing it into a
// component does not drag the font loader into Storybook's build graph.
export const PIXEL = { fontFamily: 'var(--font-pixelify)' } as const
export const PRESS = { fontFamily: 'var(--font-press-start)' } as const
export const MONO = { fontFamily: 'var(--font-share-tech)' } as const
