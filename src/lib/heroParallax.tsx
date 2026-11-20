'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
  type RefObject,
} from 'react'
import {
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type SpringOptions,
} from 'motion/react'

interface HeroPointerContextValue {
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
  scrollProgress: MotionValue<number>
  pointerInfluence: MotionValue<number>
  reducedMotion: boolean
  active: boolean
}

/** Standalone atom stories remain active without requiring a scene provider. */
export function useHeroActivity(): boolean {
  return useContext(HeroPointerContext)?.active ?? true
}

const HeroPointerContext = createContext<HeroPointerContextValue | null>(null)

function useHeroPointerContext() {
  const ctx = useContext(HeroPointerContext)
  if (!ctx) {
    throw new Error('useHeroParallax must be used within a HeroPointerProvider')
  }
  return ctx
}

/** Raw pointer/scroll motion values, for objects (like HeroRabbit) that need bespoke reactions beyond a simple depth-based parallax translate. */
export function useHeroPointerValues() {
  return useHeroPointerContext()
}

/**
 * Single shared pointer/scroll source for the whole hero scene: one pointermove
 * listener and one scroll-progress subscription, consumed by every ParallaxLayer
 * via useHeroParallax(depth) instead of each object tracking the pointer itself.
 */
export function HeroPointerProvider({
  containerRef,
  children,
}: {
  containerRef: RefObject<HTMLElement | null>
  children: ReactNode
}) {
  const [active, setActive] = useState(true)
  useEffect(() => {
    const node = containerRef.current
    if (!node) return
    let inView = true
    function updateActivity(): void {
      setActive(inView && !document.hidden)
    }
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      updateActivity()
    })
    observer.observe(node)
    document.addEventListener('visibilitychange', updateActivity)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', updateActivity)
    }
  }, [containerRef])
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const reducedMotion = Boolean(useReducedMotion())

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const scrollProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.5 })
  const pointerInfluence = useTransform(scrollProgress, [0, 1], [1, 0])

  useEffect(() => {
    const node = containerRef.current
    if (!node) return
    if (reducedMotion || !active) {
      pointerX.set(0)
      pointerY.set(0)
      return
    }

    const pointerTarget = node
    const pointerCapability = window.matchMedia('(hover: hover) and (pointer: fine)')
    let pendingPointer: { clientX: number; clientY: number } | null = null
    let pointerFrame: number | null = null
    function applyPointer(): void {
      pointerFrame = null
      if (!pendingPointer) return
      const { clientX, clientY } = pendingPointer
      pendingPointer = null
      const rect = pointerTarget.getBoundingClientRect()
      const nx = ((clientX - rect.left) / rect.width - 0.5) * 2
      const ny = ((clientY - rect.top) / rect.height - 0.5) * 2
      pointerX.set(Math.max(-1, Math.min(1, nx)))
      pointerY.set(Math.max(-1, Math.min(1, ny)))
    }
    function handlePointerMove(event: PointerEvent): void {
      if (!pointerCapability.matches || event.pointerType !== 'mouse') return
      pendingPointer = { clientX: event.clientX, clientY: event.clientY }
      if (pointerFrame === null) pointerFrame = requestAnimationFrame(applyPointer)
    }
    function cancelPointerFrame(): void {
      if (pointerFrame !== null) cancelAnimationFrame(pointerFrame)
      pointerFrame = null
      pendingPointer = null
    }
    function handlePointerLeave(): void {
      cancelPointerFrame()
      pointerX.set(0)
      pointerY.set(0)
    }

    pointerCapability.addEventListener('change', handlePointerLeave)
    node.addEventListener('pointermove', handlePointerMove)
    node.addEventListener('pointerleave', handlePointerLeave)
    node.addEventListener('pointercancel', handlePointerLeave)
    return () => {
      cancelPointerFrame()
      pointerCapability.removeEventListener('change', handlePointerLeave)
      node.removeEventListener('pointermove', handlePointerMove)
      node.removeEventListener('pointerleave', handlePointerLeave)
      node.removeEventListener('pointercancel', handlePointerLeave)
    }
  }, [containerRef, pointerX, pointerY, reducedMotion, active])

  const contextValue = useMemo(
    () => ({ pointerX, pointerY, scrollProgress, pointerInfluence, reducedMotion, active }),
    [pointerX, pointerY, scrollProgress, pointerInfluence, reducedMotion, active]
  )

  return (
    <HeroPointerContext.Provider value={contextValue}>
      <style>{`[data-hero-active="false"] *, [data-hero-active="false"] *::before, [data-hero-active="false"] *::after { animation-play-state: paused !important; }`}</style>
      <div data-hero-active={active} style={{ display: 'contents' }}>
        {children}
      </div>
    </HeroPointerContext.Provider>
  )
}

const MAX_PX = 12
const DEFAULT_SPRING: SpringOptions = { stiffness: 120, damping: 20, mass: 0.4 }

export interface HeroDrift {
  x?: number
  y?: number
}

export interface UseHeroParallaxOptions {
  /** Extra px this layer drifts toward as the hero scrolls out of view. */
  drift?: HeroDrift
  /** Spring tuning; give the anchor object a stiffer spring so it reads as stable. */
  spring?: SpringOptions
  /** Final opacity after the stage leaves the viewport (default 0). Fading only starts in the last 30% of the exit. */
  fadeTo?: number
}

/**
 * depth ~0 = background (2-4px), ~0.35 = midground (4-8px), ~0.7 = foreground
 * (6-12px), ~0.05 = the computer anchor (0-3px). Respects prefers-reduced-motion
 * by zeroing depth/drift so the returned style is always transform: none-equivalent.
 */
export function useHeroParallax(depth: number, options: UseHeroParallaxOptions = {}) {
  const { pointerX, pointerY, scrollProgress, pointerInfluence, reducedMotion } =
    useHeroPointerContext()
  const driftX = reducedMotion ? 0 : (options.drift?.x ?? 0)
  const driftY = reducedMotion ? 0 : (options.drift?.y ?? 0)
  const effectiveDepth = reducedMotion ? 0 : depth
  const spring = options.spring ?? DEFAULT_SPRING

  // Function transforms subscribe only to values read by the active branch.
  // Stationary/reduced-motion layers need neither pointer nor scroll translations.
  const rawX = useTransform(() => {
    const pointer =
      effectiveDepth === 0 ? 0 : pointerX.get() * effectiveDepth * MAX_PX * pointerInfluence.get()
    const drift = driftX === 0 ? 0 : scrollProgress.get() * driftX
    return pointer + drift
  })
  const rawY = useTransform(() => {
    const pointer =
      effectiveDepth === 0 ? 0 : pointerY.get() * effectiveDepth * MAX_PX * pointerInfluence.get()
    const drift = driftY === 0 ? 0 : scrollProgress.get() * driftY
    return pointer + drift
  })
  const fadeTo = options.fadeTo ?? 0
  const opacity = useTransform(
    scrollProgress,
    [0, 0.7, 1],
    reducedMotion ? [1, 1, 1] : [1, 1, fadeTo]
  )

  const x = useSpring(rawX, spring)
  const y = useSpring(rawY, spring)

  return { style: { x, y, opacity } }
}
