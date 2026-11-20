'use client'

import { useEffect, useEffectEvent, type CSSProperties } from 'react'

const PARTICLES = [
  { angle: -92, distanceScale: 1, color: '#FFD03A', size: 34, glyph: '✦', delay: 0 },
  { angle: -22, distanceScale: 0.92, color: '#FBF9FF', size: 26, glyph: '✧', delay: 35 },
  { angle: 52, distanceScale: 1.08, color: '#DCD3F2', size: 30, glyph: '✦', delay: 70 },
  { angle: 138, distanceScale: 0.96, color: '#FFD03A', size: 24, glyph: '✧', delay: 105 },
  { angle: 205, distanceScale: 1.04, color: '#FBF9FF', size: 28, glyph: '✦', delay: 140 },
] as const

interface HeroSparkBurstProps {
  x: number
  y: number
  radius: number
  reducedMotion: boolean
  onComplete: () => void
}

/** Brief visual feedback emitted from a desk object after click or keyboard activation. */
export default function HeroSparkBurst({
  x,
  y,
  radius,
  reducedMotion,
  onComplete,
}: HeroSparkBurstProps) {
  const complete = useEffectEvent(onComplete)
  useEffect(() => {
    const timeout = setTimeout(complete, reducedMotion ? 420 : 1150)
    return () => clearTimeout(timeout)
  }, [reducedMotion])

  return (
    <span
      data-hero-spark-burst
      aria-hidden="true"
      className="pointer-events-none absolute z-30"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {PARTICLES.map((particle) => {
        const radians = (particle.angle * Math.PI) / 180
        const distance = reducedMotion ? 5 : radius * particle.distanceScale
        const targetX = Math.cos(radians) * distance
        const targetY = Math.sin(radians) * distance

        return (
          <span
            key={particle.angle}
            className="hero-spark-particle absolute left-0 top-0 block leading-none"
            style={
              {
                '--spark-x': `${targetX}px`,
                '--spark-y': `${targetY}px`,
                '--spark-rotate': `${reducedMotion ? 0 : particle.angle + 90}deg`,
                '--spark-delay': reducedMotion ? '0ms' : `${particle.delay}ms`,
                color: particle.color,
                fontSize: particle.size,
              } as CSSProperties
            }
          >
            {particle.glyph}
          </span>
        )
      })}
    </span>
  )
}
