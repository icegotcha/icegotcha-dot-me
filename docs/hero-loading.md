# Hero image loading

The computer is server-rendered as a native image with eager loading and high fetch priority. Other decorative objects retain native lazy loading, async decoding, and low fetch priority. The browser chooses WebP variants using `srcSet` and `sizes`; intrinsic dimensions reserve the existing aspect ratios without JavaScript layout measurement.

Original assets in `public/images/hero/` are unchanged. Derivatives in `public/images/hero/responsive/` preserve aspect ratio and alpha, at widths 160, 320, 640, and 960 where smaller than the source. Full-size originals remain the largest candidate and fallback. No runtime image service or new dependency is required.

Regenerate after changing source images or object size rules:

```bash
node scripts/optimize-hero-images.mjs
```

The script reuses Next.js’s installed Sharp and Storybook’s installed Prettier. Keep its `sizes` values aligned with the percentage compositions in `HeroStage`; it also generates `src/lib/heroImageManifest.ts` for the shared `getHeroImageProps` helper.

## Local verification (2026-10-18)

Fresh regular Chromium contexts, localhost development server, reduced motion, viewport height 1000px. Totals cover the 14 unique Hero image responses, including rabbit expression images; they exclude other page images, JavaScript, and fonts. These are image payload measurements, not a claimed LCP or page-load timing improvement.

| Viewport width | DPR | Before (bytes) | After (bytes) | Reduction |
| -------------- | --- | -------------- | ------------- | --------- |
| 1440px         | 1×  | 1,711,130      | 91,804        | 94.6%     |
| 390px          | 1×  | 1,711,130      | 74,090        | 95.7%     |
| 1440px         | 2×  | 1,711,130      | 193,324       | 88.7%     |
| 390px          | 2×  | 1,711,130      | 145,314       | 91.5%     |

All rendered image widths matched the baseline across these four cases. Every selected image decoded successfully; all 54 derivative files retained alpha presence and aspect ratio. Keyboard sparkle feedback and reduced-motion behavior were checked on desktop and mobile.
