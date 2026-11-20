'use client'

import { useHeroActivity } from '@/lib/heroParallax'
import { getHeroImageProps } from '@/lib/heroImages'
import type { ReactElement } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { HERO_COLORS } from '@/lib/heroTheme'

/** Float the original notebook artwork, with shooting stars as a decorative overlay. */
export default function HeroNotebook(): ReactElement {
  const active = useHeroActivity()
  const reducedMotion = useReducedMotion() || !active

  return (
    <motion.div
      data-hero-notebook-floating
      animate={reducedMotion ? { y: 0 } : { y: ['0%', '-9%', '0%'] }}
      transition={
        reducedMotion ? { duration: 0 } : { duration: 6.5, repeat: Infinity, ease: 'easeInOut' }
      }
      className="relative h-full w-full"
    >
      <motion.div
        whileHover={reducedMotion ? undefined : { rotate: -3, y: -3 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="h-full w-full"
      >
        <img
          loading="lazy"
          fetchPriority="low"
          decoding="async"
          {...getHeroImageProps('/images/hero/notebook.webp')}
          alt=""
          className="h-full w-full object-contain"
          draggable={false}
        />
      </motion.div>
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 200 140"
        className="pointer-events-none absolute -inset-[15%] h-[130%] w-[130%] overflow-visible"
      >
        <style>{`
          @keyframes notebook-star-flight {
            0%, 12% { opacity: 0; transform: translate(0px, 114px); }
            18% { opacity: 0.9; }
            46% { opacity: 0; transform: translate(190px, 8px); }
            100% { opacity: 0; transform: translate(190px, 8px); }
          }
          .notebook-shooting-star {
            opacity: 0;
            animation: notebook-star-flight 5.8s linear infinite;
          }
          .notebook-shooting-star-secondary {
            animation-delay: -2.9s;
            animation-duration: 7.2s;
          }
          @media (prefers-reduced-motion: reduce) {
            .notebook-shooting-star { animation: none; opacity: 0; }
            [data-hero-notebook-floating] { transform: none !important; }
          }
        `}</style>
        <g className="notebook-shooting-star" fill={HERO_COLORS.yellow}>
          <path
            d="M-24 14L-9 5"
            stroke={HERO_COLORS.yellow}
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.2"
          />
          <path
            d="M-10 6L-3 2"
            stroke={HERO_COLORS.cream}
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.65"
          />
          <path d="M0-5L1.5-1.5L5 0L1.5 1.5L0 5L-1.5 1.5L-5 0L-1.5-1.5Z" />
        </g>
        <g
          className="notebook-shooting-star notebook-shooting-star-secondary"
          fill={HERO_COLORS.lavenderLight}
        >
          <path
            d="M-18 10L-3 2"
            stroke={HERO_COLORS.lavenderLight}
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.4"
          />
          <path d="M0-3L1-1L3 0L1 1L0 3L-1 1L-3 0L-1-1Z" />
        </g>
      </svg>
    </motion.div>
  )
}
