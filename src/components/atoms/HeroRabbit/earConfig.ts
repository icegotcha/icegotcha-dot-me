import type { HeroImageSrc } from '@/lib/heroImages'

export type EarSide = 'left' | 'right'

/**
 * HOW TO TUNE AN EAR
 * -------------------
 * Everything you'd normally want to adjust lives in `pose` below, per side.
 * All percentages are relative to the shared Rabbit wrapper box (which has
 * rabbit-body.webp's own aspect ratio — see HeroRabbit/index.tsx).
 *
 *   x, y      — where the ear's base attaches on the head. Nudge these
 *               together to move the ear as a whole; keep left/right close
 *               together so both ears read as coming from the same crown.
 *   width     — how big the ear renders. Height follows automatically from
 *               the source PNG's own aspect ratio (never stretched).
 *   rotation  — the ear's NEUTRAL resting angle, in degrees, applied on top
 *               of whatever diagonal lean is already baked into the art.
 *               This is what actually controls how upright vs. floppy the
 *               ear looks — 0 does NOT mean "vertical" here. More negative
 *               = rotated further counter-clockwise.
 *
 * `art` below is measured directly from each image's alpha channel and should
 * rarely need to change — only touch it if the source images themselves are
 * replaced.
 */

export interface EarPose {
  /** Attachment point on the head, as a % of the shared Rabbit wrapper box. */
  x: number
  y: number
  /** Ear width, as a % of the shared Rabbit wrapper box. */
  width: number
  /** Neutral resting rotation in degrees — see cheat sheet above. */
  rotation: number
}

export interface EarArt {
  src: HeroImageSrc
  /** Intrinsic pixel size of the source image — used as a CSS aspect-ratio so it is never stretched. */
  naturalWidth: number
  naturalHeight: number
  /**
   * Center of the ear's base (the fur tuft where it meets the head), as a %
   * of the ear's OWN canvas — the centroid of the bottom 10% of its opaque
   * content, measured from the source PNG, not guessed. Rotation pivots
   * here, and the ear is positioned so this exact point lands on `pose.x/y`.
   */
  baseX: number
  baseY: number
}

const EAR_ART: Record<EarSide, EarArt> = {
  left: {
    src: '/images/hero/rabbit-ear-left.webp',
    naturalWidth: 745,
    naturalHeight: 1024,
    baseX: 39.6,
    baseY: 87.9,
  },
  right: {
    src: '/images/hero/rabbit-ear-right.webp',
    naturalWidth: 748,
    naturalHeight: 1024,
    baseX: 32.6,
    baseY: 89.3,
  },
}

/**
 * Both source ears lean the same way in their own canvas (toward
 * positive/right), so at rotation: 0 they'd look inconsistent (one leaning
 * in, one leaning out, by different amounts) — these values are what
 * correct them into a coherent, anatomically-attached pair.
 */
const EAR_POSE: Record<EarSide, EarPose> = {
  left: { x: 30, y: 40, width: 36, rotation: 30 },
  right: { x: 54, y: 44, width: 36, rotation: 30 },
}

export function getEarConfig(side: EarSide): EarArt & EarPose {
  return { ...EAR_ART[side], ...EAR_POSE[side] }
}
