'use client'

import { useRef, type ReactElement } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import HeroMagicDrawing from '@/components/atoms/HeroMagicDrawing'
import HeroObjectTooltip from '@/components/atoms/HeroObjectTooltip'
import { getHeroImageProps } from '@/lib/heroImages'
import { HERO_COLORS } from '@/lib/heroTheme'

interface BrushPaintingProps {
  painting: boolean
  drawingIndex: number
}

/** Brush and ink share the same local coordinates, parallax, rotation, and frame clock. */
export default function BrushPainting({
  painting,
  drawingIndex,
}: BrushPaintingProps): ReactElement {
  const brushRef = useRef<HTMLDivElement>(null)
  function followPen(point: { x: number; y: number }, elapsed: number): void {
    const targetX = 125 + point.x * 0.6 - 147
    const targetY = -110 + point.y * 0.6 - 1
    let influence = 1
    if (elapsed < 300) influence = 1 - Math.pow(1 - elapsed / 300, 3)
    if (elapsed > 1500) influence = Math.max(0, 1 - (elapsed - 1500) / 350)
    const lift = elapsed < 300 ? Math.sin((elapsed / 300) * Math.PI) * 18 : 0
    // Write ink and brush transforms in the same RAF; Motion's deferred transform
    // render would leave the visible tip one frame behind the stroke.
    if (brushRef.current) {
      brushRef.current.style.transform = `translate(${((targetX * influence) / 150) * 100}%, ${targetY * influence - lift}%) rotate(${6 * influence}deg)`
    }
  }
  const reducedMotion = useReducedMotion()
  return (
    <div
      className={`relative h-full w-full ${painting ? '[&_.hero-object-tooltip]:invisible' : ''}`}
    >
      <HeroObjectTooltip decorative align="start">
        Paint a little magic ✦
      </HeroObjectTooltip>
      <style>{`
        .hero-brush-glow { opacity: 0; transition: opacity 200ms ease-out; }
        .group:hover .hero-brush-glow, .group:focus-visible .hero-brush-glow { opacity: 1; }
        @media (prefers-reduced-motion: reduce) {
          .hero-brush-glow { transition: none; }
        }
      `}</style>
      <motion.div
        whileHover={reducedMotion || painting ? undefined : { rotate: -6, y: -4 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="relative h-full w-full -rotate-12"
      >
        {painting && (
          <div className="pointer-events-none absolute left-[83.3333%] top-[-110%] aspect-square w-[40%]">
            <HeroMagicDrawing index={drawingIndex} onPenFrame={followPen} />
          </div>
        )}
        <div
          ref={brushRef}
          data-hero-brush-body
          className="relative h-full w-full"
          style={{ transformOrigin: '98% 1%' }}
        >
          <span data-hero-brush-tip className="pointer-events-none absolute left-[98%] top-[1%]" />
          <img
            loading="lazy"
            fetchPriority="low"
            decoding="async"
            {...getHeroImageProps('/images/hero/brush.webp')}
            alt=""
            className="h-full w-full object-contain"
            draggable={false}
          />
          <span
            aria-hidden="true"
            className="hero-brush-glow pointer-events-none absolute left-[98%] top-[1%] h-[22%] w-[9%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: `radial-gradient(circle, ${HERO_COLORS.yellow} 0%, ${HERO_COLORS.lavender}80 45%, transparent 70%)`,
              filter: 'blur(3px)',
            }}
          />
        </div>
      </motion.div>
    </div>
  )
}
