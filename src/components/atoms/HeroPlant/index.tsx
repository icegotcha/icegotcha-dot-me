'use client'

import { useEffect, useRef, type ReactElement } from 'react'
import { useReducedMotion } from 'motion/react'
import { getHeroImageProps } from '@/lib/heroImages'

/** A short, restartable click reaction pivots the original artwork around its base. */
export default function HeroPlant(): ReactElement {
  const imageRef = useRef<HTMLImageElement>(null)
  const animationRef = useRef<Animation | null>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) animationRef.current?.cancel()
    return () => animationRef.current?.cancel()
  }, [reducedMotion])

  function wobble(): void {
    animationRef.current?.cancel()
    if (reducedMotion || !imageRef.current) return
    animationRef.current = imageRef.current.animate(
      [
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(-2deg)' },
        { transform: 'rotate(1.5deg)' },
        { transform: 'rotate(-0.6deg)' },
        { transform: 'rotate(0deg)' },
      ],
      { duration: 650, easing: 'ease-in-out' }
    )
  }

  return (
    <button
      type="button"
      aria-label="Gently wobble the bunny planter"
      onClick={wobble}
      className="block h-full w-full cursor-pointer border-0 bg-transparent p-0 transition-[filter] hover:brightness-110 focus-visible:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD03A] motion-reduce:transition-none"
    >
      <img
        ref={imageRef}
        loading="lazy"
        fetchPriority="low"
        decoding="async"
        {...getHeroImageProps('/images/hero/bunny-planter.webp')}
        alt=""
        draggable={false}
        className="h-full w-full object-contain"
        style={{ transformOrigin: '50% 90%' }}
      />
    </button>
  )
}
