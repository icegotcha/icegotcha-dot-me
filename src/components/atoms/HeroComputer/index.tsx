import { getHeroImageProps } from '@/lib/heroImages'
import CodeScreenOverlay from './CodeScreenOverlay'
import { memo, type ReactElement } from 'react'

/** The hero's visual anchor: the generated computer artwork with a live animated code overlay clipped to its screen. */
function HeroComputer(): ReactElement {
  return (
    <div className="relative h-full w-full">
      <img
        loading="eager"
        fetchPriority="high"
        decoding="async"
        {...getHeroImageProps('/images/hero/computer.webp')}
        alt=""
        className="h-full w-full object-contain"
        draggable={false}
      />
      <CodeScreenOverlay />
      <div
        aria-hidden="true"
        className="hero-screen-glow pointer-events-none absolute left-[10%] top-[8%] h-[58%] w-[80%] rounded-[4%]"
      />
      <style>{`
        .hero-screen-glow {
          box-shadow: inset 0 0 14px 3px rgba(196,169,220,0.35);
          opacity: 0.12;
          animation: heroScreenGlow 9s ease-in-out infinite;
        }
        @keyframes heroScreenGlow { 0%, 100% { opacity: 0.12; } 50% { opacity: 0.26; } }
        @media (prefers-reduced-motion: reduce) { .hero-screen-glow { animation: none; opacity: 0.12; } }
      `}</style>
    </div>
  )
}

export default memo(HeroComputer)
