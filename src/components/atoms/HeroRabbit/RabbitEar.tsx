'use client'

import type { ReactElement } from 'react'
import { motion, useReducedMotion, type Transition } from 'motion/react'
import { getHeroImageProps } from '@/lib/heroImages'
import { getEarConfig, type EarSide } from './earConfig'

export type EarMode = 'idle' | 'hover' | 'flick' | 'rest'

/**
 * Idle/hover/flick rotations are all deltas ADDED to the ear's own corrected
 * neutral `rotation` (see earConfig.ts) — never absolute angles, and never
 * plain `rotate(0deg)`. Idle is a slow, loose sway around that neutral pose;
 * hover is a small one-shot twitch; flick is a larger single overshoot. Every
 * one of these arrays/targets starts and ends at delta 0, so switching
 * between them — including resuming idle after a hover — never jumps.
 */
const IDLE_DELTA: Record<EarSide, number[]> = {
  left: [0, -3, 2, -1, 0],
  right: [0, 2, -2, 1, 0],
}
const IDLE_DURATION: Record<EarSide, number> = { left: 4.4, right: 3.9 }
const IDLE_DELAY: Record<EarSide, number> = { left: 0, right: 0.5 }

/** A small one-shot greeting returns both ears to their original neutral pose. */
const HOVER_DELTA: Record<EarSide, number[]> = { left: [0, -3, 0], right: [0, 3, 0] }
const FLICK_DELTA: Record<EarSide, number[]> = { left: [0, -10, 0], right: [0, 10, 0] }
const FLICK_TIMES = [0, 0.4, 1]

interface RabbitEarProps {
  side: EarSide
  mode: EarMode
}

interface EarAnimation {
  delta: number | number[]
  transition: Transition
}

function getEarAnimation(side: EarSide, mode: EarMode, reducedMotion: boolean): EarAnimation {
  if (reducedMotion) return { delta: 0, transition: { duration: 0 } }

  switch (mode) {
    case 'rest':
      return { delta: 0, transition: { duration: 0 } }
    case 'hover':
      return {
        delta: HOVER_DELTA[side],
        transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
      }
    case 'flick':
      return {
        delta: FLICK_DELTA[side],
        transition: { duration: 0.4, ease: 'easeOut', times: FLICK_TIMES },
      }
    default:
      return {
        delta: IDLE_DELTA[side],
        transition: {
          duration: IDLE_DURATION[side],
          delay: IDLE_DELAY[side],
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop',
        },
      }
  }
}

export default function RabbitEar({ side, mode }: RabbitEarProps): ReactElement {
  const prefersReducedMotion = Boolean(useReducedMotion())
  const config = getEarConfig(side)
  const { delta, transition } = getEarAnimation(side, mode, prefersReducedMotion)
  const rotate =
    typeof delta === 'number'
      ? config.rotation + delta
      : delta.map((value) => config.rotation + value)

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${config.x}%`,
        top: `${config.y}%`,
        width: `${config.width}%`,
        aspectRatio: `${config.naturalWidth} / ${config.naturalHeight}`,
        // shift the box so the art's own base-center (not its top-left corner)
        // lands exactly on the attachment point, and rotate around that same point
        x: `-${config.baseX}%`,
        y: `-${config.baseY}%`,
        transformOrigin: `${config.baseX}% ${config.baseY}%`,
      }}
      animate={{ rotate }}
      transition={transition}
    >
      <img
        loading="lazy"
        fetchPriority="low"
        decoding="async"
        {...getHeroImageProps(config.src)}
        alt=""
        className="h-full w-full object-contain"
        draggable={false}
      />
    </motion.div>
  )
}
