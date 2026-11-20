# Icegotcha Design System

This document records the shared visual language and lasting design constraints. Keep page structure, routes, component behavior, and implementation details in source. Follow `AGENTS.md` for engineering conventions and verification.

## Identity

The portfolio should feel personal, playful, and technically capable. Preserve the purple atmosphere, yellow accent, pixel typography, wordmark, and illustrated workspace.

- Keep one consistent visual world across the site.
- Prefer purposeful asymmetry and clear hierarchy over generic equal-card grids.
- Make identity, skills, work, and contact information easy to scan.
- Preserve original artwork and transparency. Adjust layout rather than redrawing assets.
- Preserve established navigation, anchors, form contracts, legal copy, and analytics identifiers unless the requested change includes them.

## Color and surfaces

Use the existing tokens in `src/styles/theme.css` as the source of truth.

| Role                 | Color                                               |
| -------------------- | --------------------------------------------------- |
| Primary accent       | Yellow `#FFD03A`                                    |
| Primary text         | Off-white `#FBF9FF`                                 |
| Text on yellow       | Deep violet `#3A2D6A`                               |
| Background           | Deep purple `#100E20` to `#251B3D`                  |
| Illustration details | Lavender `#DCD3F2`, pink `#F3BFCF`, cream `#F7EFE2` |

- Yellow is the only saturated UI accent, used for actions, focus, and selective emphasis.
- Reuse the shared background and surface treatments rather than introducing section themes.
- Keep borders and translucent surfaces subtle. Use violet-tinted shadows only when needed.
- Avoid neon glows and pure black surfaces.

## Typography and voice

Apply the existing font constants from `src/lib/fonts.ts`.

| Constant | Font            | Role                                         |
| -------- | --------------- | -------------------------------------------- |
| `PIXEL`  | Pixelify Sans   | Display headings and prominent personal copy |
| `PRESS`  | Press Start 2P  | Wordmark, navigation, and short labels       |
| `MONO`   | Share Tech Mono | Body copy and supporting information         |

- Keep font loading outside the shared component dependency graph so Storybook can build without fetching fonts.
- Use concise, balanced headings and comfortable paragraph spacing.
- Keep small pixel labels short and readable. Do not introduce another font family.
- Write in a direct, thoughtful first-person voice with concrete, verified details.
- Avoid inflated claims, fake precision, decorative labels, and duplicate calls to action.
- Avoid em-dash and en-dash characters in visible copy.
- Keep editable content in `src/content/`, separated by page.

## Layout and imagery

- Reuse established containers, spacing, and Tailwind breakpoints.
- Keep outer margins consistent and group content with whitespace.
- Define mobile composition alongside desktop layout. Prevent horizontal overflow.
- Use `rounded-2xl` for content cards and the existing shared styles for controls.
- Keep the illustrated workspace as the main visual anchor. Position its objects with responsive percentages rather than JavaScript measurements or fixed-pixel coordinates.
- Reserve image dimensions or aspect ratios to prevent layout shifts. Preserve original image proportions and transparency.
- Use Lucide for interface icons; do not mix icon families or redraw artwork as interface SVG.
- Avoid unnecessary card containers, inert controls, and fabricated screenshots.

## Motion and interaction

- Use motion to explain hierarchy, depth, interaction, or state.
- Use `motion/react` and animate transforms and opacity.
- Reuse the entrance easing `[0.16, 1, 0.3, 1]` and spring physics where appropriate.
- Keep continuous pointer and scroll values outside React state and reuse shared animation sources.
- Avoid perpetual motion on informational content. Pause inactive work and clean up listeners and timers.
- Honor `prefers-reduced-motion`; all content and controls must remain usable without animation.

## Accessibility and performance

- Use semantic controls, accessible names, keyboard navigation, and visible yellow focus rings.
- Prefer touch targets of at least 44 px and maintain WCAG AA contrast.
- Preserve heading order, focus restoration, and meaningful reading order on mobile.
- Give informative images meaningful alt text and hide decorative effects from assistive technology.
- Keep optional scripts and heavy interactions deferred until needed.
- Target LCP below 2.5 seconds, INP below 200 milliseconds, and CLS below 0.1.
- Verify affected layouts and interactions on desktop, tablet, and mobile, including reduced motion. Follow the checks in `AGENTS.md` and report any blocked validation.
