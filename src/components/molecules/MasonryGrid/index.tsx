'use client'

import { Children } from 'react'
import type { PointerEvent, ReactElement, ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'

interface MasonryGridProps {
  children: ReactNode
}

interface MasonryItemProps {
  children: ReactNode
  index: number
}

function MasonryItem({ children, index }: MasonryItemProps): ReactElement {
  const reducedMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const smoothX = useSpring(x, { stiffness: 300, damping: 25 })
  const smoothY = useSpring(y, { stiffness: 300, damping: 25 })
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-4, 4])
  const entranceDelay = Math.min(index * 0.09, 0.72)

  function handlePointerMove(event: PointerEvent<HTMLLIElement>): void {
    if (reducedMotion || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - bounds.left) / bounds.width - 0.5)
    y.set((event.clientY - bounds.top) / bounds.height - 0.5)
  }

  function resetTilt(): void {
    x.set(0)
    y.set(0)
  }

  return (
    <li
      className="mb-5 break-inside-avoid"
      style={{ perspective: 1000 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
    >
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{
          duration: reducedMotion ? 0 : 0.55,
          delay: reducedMotion ? 0 : entranceDelay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <motion.div
          style={{ rotateX: reducedMotion ? 0 : rotateX, rotateY: reducedMotion ? 0 : rotateY }}
        >
          {children}
        </motion.div>
      </motion.div>
    </li>
  )
}

export default function MasonryGrid({ children }: MasonryGridProps): ReactElement {
  return (
    <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3">
      {Children.map(children, (child, index) => (
        <MasonryItem index={index}>{child}</MasonryItem>
      ))}
    </ul>
  )
}
