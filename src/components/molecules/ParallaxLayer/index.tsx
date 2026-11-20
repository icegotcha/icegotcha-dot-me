'use client'

import { motion } from 'motion/react'
import type { MouseEvent, ReactNode } from 'react'
import { useHeroParallax, type UseHeroParallaxOptions } from '@/lib/heroParallax'

export interface HeroObjectActivation {
  clientX: number
  clientY: number
  width: number
  height: number
}

interface ParallaxLayerProps {
  depth: number
  options?: UseHeroParallaxOptions
  className?: string
  children: ReactNode
  interactiveLabel?: string
  onActivate?: (point: HeroObjectActivation) => void
}

export default function ParallaxLayer({
  depth,
  options,
  className,
  children,
  interactiveLabel,
  onActivate,
}: ParallaxLayerProps) {
  const { style } = useHeroParallax(depth, options)

  if (!interactiveLabel || !onActivate) {
    return (
      <motion.div style={style} className={className}>
        {children}
      </motion.div>
    )
  }

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()

    onActivate({
      clientX: bounds.left + bounds.width / 2,
      clientY: bounds.top + bounds.height / 2,
      width: bounds.width,
      height: bounds.height,
    })
  }

  return (
    <motion.button
      type="button"
      aria-label={interactiveLabel}
      style={style}
      className={`${className ?? ''} group cursor-pointer appearance-none border-0 bg-transparent p-0 transition-[transform,filter] hover:brightness-110 focus-visible:brightness-110 active:scale-[0.97] motion-reduce:active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD03A] motion-reduce:transition-none`}
      onClick={handleClick}
    >
      {children}
    </motion.button>
  )
}
