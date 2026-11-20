import type { ReactElement } from 'react'
import { HERO_COLORS } from '@/lib/heroTheme'

/** Three fixed accents share a long cycle, with non-overlapping reveal windows. */
export default function HeroAmbientSparkles(): ReactElement {
  return (
    <div aria-hidden="true" className="hero-decoration-enter pointer-events-none absolute inset-0">
      {[
        { position: 'left-[24%] top-[53%] sm:left-[27%] sm:top-[51%]', delay: '0s' },
        { position: 'left-[61%] top-[83%] sm:left-[62%] sm:top-[88%]', delay: '-4s' },
        { position: 'left-[95%] top-[39%] sm:left-[96%] sm:top-[57%]', delay: '-8s' },
      ].map(({ position, delay }) => (
        <svg
          key={delay}
          viewBox="0 0 20 20"
          focusable="false"
          className={`hero-ambient-sparkle absolute h-2 w-2 sm:h-2.5 sm:w-2.5 ${position}`}
          style={{ animationDelay: delay }}
        >
          <path d="M10 1L12 8L19 10L12 12L10 19L8 12L1 10L8 8Z" fill={HERO_COLORS.lavenderLight} />
        </svg>
      ))}
      <style>{`
        .hero-ambient-sparkle { opacity: 0; animation: heroAmbientSparkle 12s ease-in-out infinite; }
        @keyframes heroAmbientSparkle {
          0%, 12%, 100% { opacity: 0; transform: scale(0.9); }
          6% { opacity: 0.45; transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-ambient-sparkle { animation: none; opacity: 0; }
        }
      `}</style>
    </div>
  )
}
