'use client'

import type { ReactElement } from 'react'
import HeroObjectTooltip from '@/components/atoms/HeroObjectTooltip'
import { getHeroImageProps } from '@/lib/heroImages'
import { motion, useReducedMotion } from 'motion/react'
import SteamStrands, { type SteamShape } from './SteamStrands'

interface HeroCoffeeCupProps {
  /** Increments on every accepted activation; each value replays one steam puff. */
  puffKey?: number
  puffShape?: SteamShape
  /** Cozy message shown above the cup until the parent clears it. */
  message?: string | null
}

/**
 * coffee.png has steam hand-painted into its top ~40%. We crop that portion
 * out and rise fresh animated SteamStrands from the visible rim instead.
 */
export default function HeroCoffeeCup({
  puffKey = 0,
  puffShape = 'heart',
  message = null,
}: HeroCoffeeCupProps): ReactElement {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      whileHover={reducedMotion ? undefined : { y: -4, rotate: -2 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="relative aspect-[10/11] w-full"
    >
      <HeroObjectTooltip decorative align="start" visible={Boolean(message)}>
        {message ?? 'Take a little break ☕'}
      </HeroObjectTooltip>
      <svg
        viewBox="0 0 80 40"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute inset-x-0 top-0 h-[38%] w-full"
        aria-hidden="true"
      >
        <SteamStrands puffKey={puffKey} puffShape={puffShape} />
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-[65%] w-full overflow-hidden rounded-b-[10%]">
        <img
          loading="lazy"
          fetchPriority="low"
          decoding="async"
          {...getHeroImageProps('/images/hero/coffee.webp')}
          alt=""
          className="relative w-full object-contain"
          style={{ top: '-67%' }}
          draggable={false}
        />
      </div>
    </motion.div>
  )
}
