'use client'

import { getHeroImageProps } from '@/lib/heroImages'
import { motion, useReducedMotion } from 'motion/react'

/** Visual creativity - rotates and lifts on hover only, never spins continuously. */
export default function HeroPalette() {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      whileHover={reducedMotion ? undefined : { rotate: 8, y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="h-full w-full"
    >
      <img
        loading="lazy"
        fetchPriority="low"
        decoding="async"
        {...getHeroImageProps('/images/hero/palette.webp')}
        alt=""
        className="h-full w-full object-contain"
        draggable={false}
      />
    </motion.div>
  )
}
