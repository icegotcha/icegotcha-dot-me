'use client'

import type { ReactElement } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { PIXEL, PRESS } from '@/lib/fonts'

interface SectionHeaderProps {
  label: string
}

export default function SectionHeader({ label }: SectionHeaderProps): ReactElement {
  const reducedMotion = useReducedMotion()
  return (
    <motion.h2
      data-motion-reveal
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: reducedMotion ? 0 : 0.45 }}
      className="mb-7 flex items-baseline gap-3 text-[clamp(1.65rem,4vw,2.2rem)] leading-tight text-[#FBF9FF]"
      style={PIXEL}
    >
      <span className="text-sm text-[#FFD03A]" style={PRESS} aria-hidden="true">
        {'>'}
      </span>
      {label}
    </motion.h2>
  )
}
