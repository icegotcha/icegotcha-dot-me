'use client'

import type { ReactElement } from 'react'
import HeroObjectTooltip from '@/components/atoms/HeroObjectTooltip'
import { getHeroImageProps } from '@/lib/heroImages'
import { motion, useReducedMotion } from 'motion/react'

/** A mouse that moves a few pixels on hover and points toward the computer. */
export default function HeroMouse(): ReactElement {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      whileHover={reducedMotion ? undefined : { x: 3, rotate: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group relative h-full w-full"
    >
      <HeroObjectTooltip decorative>Click!</HeroObjectTooltip>
      <img
        loading="lazy"
        fetchPriority="low"
        decoding="async"
        {...getHeroImageProps('/images/hero/mouse.webp')}
        alt=""
        className="h-full w-full object-contain"
        draggable={false}
      />
    </motion.div>
  )
}
