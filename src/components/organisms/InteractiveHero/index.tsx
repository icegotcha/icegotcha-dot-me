'use client'

import * as Dialog from '@radix-ui/react-dialog'
import LittleSketchbookDialog from '@/components/organisms/LittleSketchbookDialog'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { MONO } from '@/lib/fonts'
import { HeroPointerProvider } from '@/lib/heroParallax'
import HeroStage, { type HeroBurst } from '@/components/molecules/HeroStage'
import {
  MAGIC_DRAWINGS,
  MAGIC_DRAWING_DURATION_MS,
  nextDrawingIndex,
} from '@/components/atoms/HeroMagicDrawing/drawings'
import type { HeroObjectActivation } from '@/components/molecules/ParallaxLayer'
import type { HeroSkyMode } from '@/lib/heroTheme'
import type { HeroComputerScreen } from '@/components/atoms/HeroComputer'

const NEXT_SCREEN: Record<HeroComputerScreen, HeroComputerScreen> = {
  code: 'browser',
  browser: 'artwork',
  artwork: 'code',
}
const MAX_VISIBLE_BURSTS = 5
const COFFEE_COOLDOWN_MS = 1800
const COFFEE_MESSAGE_MS = 4000
const COFFEE_MESSAGES = [
  'A little pause, a little inspiration.',
  'Good ideas need coffee breaks.',
  'Creating something wonderful takes time.',
  'Rest, recharge, create.',
]
/**
 * Owns the shared pointer source and the discrete feedback layer for the
 * illustrated scene. Continuous pointer movement stays in Motion values,
 * while clicks create short-lived React state.
 */
export default function InteractiveHero() {
  const [sketchbookOpen, setSketchbookOpen] = useState(false)
  const [skyMode, setSkyMode] = useState<HeroSkyMode>('moon')
  const [computerScreen, setComputerScreen] = useState<HeroComputerScreen>('code')
  const [brushDrawing, setBrushDrawing] = useState<{ key: number; index: number } | null>(null)
  const brushSequence = useRef(0)
  const lastDrawing = useRef<number | null>(null)
  const brushReadyAt = useRef(0)
  const brushTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [coffeeBreak, setCoffeeBreak] = useState<{
    key: number
    shape: 'heart' | 'star'
    message: string | null
  }>({ key: 0, shape: 'heart', message: null })
  const coffeeReadyAt = useRef(0)
  const coffeeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const stageRef = useRef<HTMLDivElement>(null)
  const nextBurstId = useRef(0)
  const reducedMotion = Boolean(useReducedMotion())
  const [bursts, setBursts] = useState<HeroBurst[]>([])

  const handleObjectActivate = useCallback((point: HeroObjectActivation) => {
    const stage = stageRef.current
    if (!stage) return

    const bounds = stage.getBoundingClientRect()
    const x = ((point.clientX - bounds.left) / bounds.width) * 100
    const y = ((point.clientY - bounds.top) / bounds.height) * 100
    const burst = {
      id: nextBurstId.current++,
      x: Math.max(2, Math.min(98, x)),
      y: Math.max(2, Math.min(98, y)),
      radius: Math.hypot(point.width, point.height) / 2 + 24,
    }

    setBursts((current) => [...current.slice(-(MAX_VISIBLE_BURSTS - 1)), burst])
  }, [])

  const handleMouseActivate = useCallback(() => {
    setComputerScreen((current) => NEXT_SCREEN[current])
  }, [])

  const handlePlantActivate = useCallback(() => {
    setSkyMode((current) => (current === 'moon' ? 'sun' : 'moon'))
  }, [])

  const handleBrushActivate = useCallback(() => {
    const now = Date.now()
    if (now < brushReadyAt.current) return
    brushReadyAt.current = now + MAGIC_DRAWING_DURATION_MS + 250
    const index = nextDrawingIndex(lastDrawing.current, Math.random())
    lastDrawing.current = index
    setBrushDrawing({ key: ++brushSequence.current, index })
    clearTimeout(brushTimer.current)
    brushTimer.current = setTimeout(() => setBrushDrawing(null), MAGIC_DRAWING_DURATION_MS)
  }, [])

  const handleCoffeeActivate = useCallback(() => {
    const now = Date.now()
    if (now < coffeeReadyAt.current) return
    coffeeReadyAt.current = now + COFFEE_COOLDOWN_MS

    const message = COFFEE_MESSAGES[Math.floor(Math.random() * COFFEE_MESSAGES.length)]
    setCoffeeBreak((current) => ({
      key: current.key + 1,
      shape: Math.random() < 0.5 ? 'heart' : 'star',
      message,
    }))
    clearTimeout(coffeeTimer.current)
    coffeeTimer.current = setTimeout(
      () => setCoffeeBreak((current) => ({ ...current, message: null })),
      COFFEE_MESSAGE_MS
    )
  }, [])

  useEffect(
    () => () => {
      clearTimeout(coffeeTimer.current)
      clearTimeout(brushTimer.current)
    },
    []
  )

  const dismissBurst = useCallback((id: number) => {
    setBursts((current) => current.filter((burst) => burst.id !== id))
  }, [])

  return (
    <div className="relative -mx-4 mt-5 flex min-h-[400px] items-end sm:min-h-[460px] lg:-mr-16 lg:mt-0 lg:min-h-[590px]">
      <div
        className="dream-window pointer-events-none absolute inset-x-[16%] bottom-[24%] top-0 -z-10"
        data-sky-mode={skyMode}
        aria-hidden="true"
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={skyMode}
            className="absolute inset-0"
            initial={reducedMotion ? false : { y: '-18%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { y: '100%', opacity: 0, rotate: 12 }}
            transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={skyMode === 'moon' ? 'dream-moon' : 'dream-sun'} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="w-full pb-0 sm:pb-8 lg:pb-14">
        <Dialog.Root open={sketchbookOpen} onOpenChange={setSketchbookOpen}>
          <HeroPointerProvider containerRef={stageRef}>
            <HeroStage
              ref={stageRef}
              skyMode={skyMode}
              computerScreen={computerScreen}
              onMouseActivate={handleMouseActivate}
              onPlantActivate={handlePlantActivate}
              onBrushActivate={handleBrushActivate}
              onCoffeeActivate={handleCoffeeActivate}
              coffeeBreak={coffeeBreak}
              brushDrawing={brushDrawing}
              bursts={bursts}
              reducedMotion={reducedMotion}
              onObjectActivate={handleObjectActivate}
              onDismissBurst={dismissBurst}
            />
            <p
              className="mt-3 text-center text-xs tracking-wide text-[#C4A9DC] sm:text-sm"
              style={MONO}
            >
              ✦ Tap the objects to play ✦
            </p>
            <span role="status" className="sr-only">
              Sky: {skyMode === 'moon' ? 'moon' : 'sun'}
            </span>
            <span role="status" className="sr-only">
              Computer: {computerScreen}
            </span>
            <span role="status" className="sr-only">
              {coffeeBreak.message}
            </span>
            <span role="status" className="sr-only">
              {brushDrawing
                ? `Painting a little magic: ${MAGIC_DRAWINGS[brushDrawing.index].name}.`
                : ''}
            </span>
          </HeroPointerProvider>
          {sketchbookOpen && <LittleSketchbookDialog />}
        </Dialog.Root>
      </div>
    </div>
  )
}
