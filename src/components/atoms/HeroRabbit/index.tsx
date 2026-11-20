'use client'

import { memo, useEffect, useRef, useState, type ReactElement, type MouseEvent } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { getHeroImageProps, type HeroImageSrc } from '@/lib/heroImages'
import { useHeroActivity } from '@/lib/heroParallax'
import type { HeroObjectActivation } from '@/components/molecules/ParallaxLayer'
import RabbitEar, { type EarMode } from './RabbitEar'

const FLICK_DURATION_MS = 400
const FACE_TRANSITION_SECONDS = 0.12

// Keep the original fur and silhouette; alternate frames only cover the eyes.
const EYE_MASK =
  'radial-gradient(ellipse 9% 11% at 36.5% 55.7%, #000 75%, transparent 100%), ' +
  'radial-gradient(ellipse 9% 10% at 60.5% 64%, #000 75%, transparent 100%)'

type Face = 'open' | 'half' | 'closed'

const FACE_SRC: Record<Face, HeroImageSrc> = {
  open: '/images/hero/rabbit-body.webp',
  half: '/images/hero/rabbit-half-blink.webp',
  closed: '/images/hero/rabbit-closed.webp',
}

const BLINK_STEPS: { face: Face; holdMs: number }[] = [
  { face: 'half', holdMs: 140 },
  { face: 'closed', holdMs: 130 },
  { face: 'half', holdMs: 140 },
  { face: 'open', holdMs: 0 },
]
const BLINK_GAP_MIN_MS = 2600
const BLINK_GAP_MAX_MS = 6000

function useBlinkFace(enabled: boolean): Face {
  const [face, setFace] = useState<Face>('open')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    if (!enabled) return

    let cancelled = false

    const scheduleNextBlink = () => {
      const gap = BLINK_GAP_MIN_MS + Math.random() * (BLINK_GAP_MAX_MS - BLINK_GAP_MIN_MS)
      timeoutRef.current = setTimeout(() => runBlink(0), gap)
    }

    const runBlink = (stepIndex: number) => {
      if (cancelled) return

      const step = BLINK_STEPS[stepIndex]
      setFace(step.face)

      if (stepIndex < BLINK_STEPS.length - 1) {
        timeoutRef.current = setTimeout(() => runBlink(stepIndex + 1), step.holdMs)
      } else {
        scheduleNextBlink()
      }
    }

    scheduleNextBlink()

    return () => {
      cancelled = true
      clearTimeout(timeoutRef.current)
    }
  }, [enabled])

  return enabled ? face : 'open'
}

/** Original body, blink frames, and independent ears stay anchored to the shelf.
 * Hover/focus reactions have a cooldown; explicit activation always gets feedback.
 */
interface HeroRabbitProps {
  onActivate?: (point: HeroObjectActivation) => void
}

function HeroRabbit({ onActivate }: HeroRabbitProps): ReactElement {
  const active = useHeroActivity()
  const lastHover = useRef(-Infinity)
  const prefersReducedMotion = useReducedMotion()
  const [mode, setMode] = useState<EarMode>('idle')
  const flickTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const face = useBlinkFace(active && !prefersReducedMotion)

  useEffect(() => {
    return () => clearTimeout(flickTimeout.current)
  }, [])

  function reactToRabbit(hover: boolean): void {
    if (prefersReducedMotion || !active) return
    const now = performance.now()
    if (hover && now - lastHover.current < 2000) return
    if (hover) lastHover.current = now
    clearTimeout(flickTimeout.current)
    setMode(hover ? 'hover' : 'flick')
    flickTimeout.current = setTimeout(() => setMode('idle'), FLICK_DURATION_MS)
  }

  function handleClick(event: MouseEvent<HTMLButtonElement>): void {
    reactToRabbit(false)
    const bounds = event.currentTarget.getBoundingClientRect()
    onActivate?.({
      clientX: bounds.left + bounds.width / 2,
      clientY: bounds.top + bounds.height / 2,
      width: bounds.width,
      height: bounds.height,
    })
  }

  return (
    <button
      type="button"
      aria-label="Play with the rabbit"
      data-ear-reaction={mode}
      className="relative h-full w-full cursor-pointer border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD03A]"
      onPointerEnter={(event) => {
        if (event.pointerType !== 'touch') reactToRabbit(true)
      }}
      onFocus={() => reactToRabbit(true)}
      onClick={handleClick}
    >
      <RabbitEar side="left" mode={active ? mode : 'rest'} />
      <RabbitEar side="right" mode={active ? mode : 'rest'} />

      <div className="relative h-full w-full aspect-[1374/1145]">
        {(Object.keys(FACE_SRC) as Face[]).map((currentFace) => (
          <motion.div
            key={currentFace}
            initial={false}
            className="absolute inset-0 h-full w-full"
            style={
              currentFace === 'closed'
                ? { maskImage: EYE_MASK, WebkitMaskImage: EYE_MASK }
                : undefined
            }
            animate={{
              // Keep lower layers opaque so fades never expose the background.
              opacity:
                currentFace === 'open' ||
                (currentFace === 'half' && face !== 'open') ||
                (currentFace === 'closed' && face === 'closed')
                  ? 1
                  : 0,
            }}
            transition={{
              opacity: {
                duration: prefersReducedMotion ? 0 : FACE_TRANSITION_SECONDS,
                ease: 'easeInOut',
              },
            }}
          >
            <img
              loading="lazy"
              fetchPriority="low"
              decoding="async"
              {...getHeroImageProps(FACE_SRC[currentFace])}
              alt=""
              draggable={false}
              className="h-full w-full object-contain"
            />
          </motion.div>
        ))}
      </div>
    </button>
  )
}

export default memo(HeroRabbit)
