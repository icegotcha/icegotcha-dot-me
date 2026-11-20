'use client'

import type { ReactElement, ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

interface StoryRevealProps {
  children: ReactNode
  className?: string
}

export default function StoryReveal({ children, className }: StoryRevealProps): ReactElement {
  const reducedMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      data-motion-reveal
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reducedMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
