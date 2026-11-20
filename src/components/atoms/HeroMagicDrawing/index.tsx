'use client'

import { useEffect, useEffectEvent, useId, useRef, type ReactElement } from 'react'
import { useReducedMotion } from 'motion/react'
import { useHeroActivity } from '@/lib/heroParallax'
import { MAGIC_DRAWINGS } from './drawings'

interface HeroMagicDrawingProps {
  index: number
  onPenFrame?: (point: { x: number; y: number }, elapsed: number) => void
}

/** Normalized path lengths let every motif reveal one stroke at a time. */
export default function HeroMagicDrawing({
  index,
  onPenFrame,
}: HeroMagicDrawingProps): ReactElement {
  const gradientId = useId()
  const outlineId = `${gradientId}-outline`
  const svgRef = useRef<SVGSVGElement>(null)
  const elapsedRef = useRef(0)
  const reducedMotion = useReducedMotion()
  const active = useHeroActivity()
  const updatePen = useEffectEvent((point: { x: number; y: number }, elapsed: number) => {
    onPenFrame?.(point, elapsed)
  })
  useEffect(() => {
    elapsedRef.current = 0
  }, [index])
  useEffect(() => {
    const paths = Array.from(
      svgRef.current?.querySelectorAll<SVGPathElement>('.hero-magic-line') ?? []
    )
    if (!paths.length) return
    if (reducedMotion) {
      for (const path of paths) path.style.strokeDashoffset = '0'
      updatePen({ x: 0, y: 0 }, 1850)
      return
    }
    if (!active) return
    const lengths = paths.map((path) => path.getTotalLength())
    let previousTime: number | undefined
    let frame = 0
    function tick(now: number): void {
      if (previousTime !== undefined) elapsedRef.current += now - previousTime
      previousTime = now
      const elapsed = elapsedRef.current
      const progress = Math.max(0, Math.min(1, (elapsed - 300) / 1200))
      const strokeProgress = progress * paths.length
      for (const [index, path] of paths.entries()) {
        path.style.strokeDashoffset = String(1 - Math.max(0, Math.min(1, strokeProgress - index)))
      }
      const strokeIndex = Math.min(paths.length - 1, Math.floor(strokeProgress))
      const localProgress = Math.min(1, strokeProgress - strokeIndex)
      const point = paths[strokeIndex].getPointAtLength(lengths[strokeIndex] * localProgress)
      updatePen(point, elapsed)
      if (elapsed < 1850) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, reducedMotion, index])
  const drawing = MAGIC_DRAWINGS[index]
  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      aria-hidden="true"
      data-magic-drawing={drawing.name}
      className="hero-magic-drawing h-full w-full"
      fill="none"
      stroke={`url(#${gradientId})`}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="15"
          y1="15"
          x2="85"
          y2="85"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FF68AA" />
          <stop offset="0.2" stopColor="#FF9D50" />
          <stop offset="0.35" stopColor="#FFE04D" />
          <stop offset="0.5" stopColor="#53E0AB" />
          <stop offset="0.7" stopColor="#53BEFF" />
          <stop offset="1" stopColor="#AC82FF" />
        </linearGradient>
        <filter
          id={outlineId}
          x="-10"
          y="-10"
          width="120"
          height="120"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feMorphology in="SourceAlpha" operator="dilate" radius="1.8" result="edge" />
          <feFlood floodColor="#21132F" result="ink" />
          <feComposite in="ink" in2="edge" operator="in" result="outline" />
          <feMerge>
            <feMergeNode in="outline" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <style>{`
        .hero-magic-drawing { animation: heroMagicFarewell 4s linear both; }
        .hero-magic-line {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
        }
        @keyframes heroMagicFarewell { 0%, 87.5% { opacity: 1; } 100% { opacity: 0; } }
        .hero-magic-sparkle { transform-origin: 85px 15px; animation: heroMagicTwinkle 650ms ease-out 1.5s both; }
        @keyframes heroMagicTwinkle {
          0% { opacity: 0; transform: scale(0.5); }
          40% { opacity: 0.8; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.7); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-magic-drawing { animation: none; }
          .hero-magic-line { animation: none; stroke-dashoffset: 0; }
          .hero-magic-sparkle { animation: none; opacity: 0; }
        }
      `}</style>
      <g filter={`url(#${outlineId})`}>
        {drawing.paths.map((path) => (
          <path key={path} d={path} pathLength={1} className="hero-magic-line" />
        ))}
      </g>
      <path
        className="hero-magic-sparkle"
        d="M85 7 Q86 14 93 15 Q86 16 85 23 Q84 16 77 15 Q84 14 85 7Z"
        stroke="#F7EFE2"
        strokeWidth="1.5"
      />
    </svg>
  )
}
