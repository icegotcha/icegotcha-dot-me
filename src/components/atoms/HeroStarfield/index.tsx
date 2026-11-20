import { memo } from 'react'
import { HERO_COLORS } from '@/lib/heroTheme'
import Star, { type StarSpec } from './Star'

const STARS: StarSpec[] = [
  {
    id: 's1',
    top: '6%',
    left: '48%',
    variant: 'sparkle',
    size: 14,
    duration: 3.2,
    delay: 0,
    color: HERO_COLORS.yellow,
  },
  {
    id: 's2',
    top: '20%',
    left: '6%',
    variant: 'dot',
    size: 6,
    duration: 2.6,
    delay: 0.6,
    color: HERO_COLORS.cream,
  },
  {
    id: 's3',
    top: '34%',
    left: '18%',
    variant: 'diamond',
    size: 7,
    duration: 3.6,
    delay: 1.1,
    color: HERO_COLORS.lavenderLight,
  },
  {
    id: 's4',
    top: '8%',
    left: '72%',
    variant: 'sparkle',
    size: 10,
    duration: 4.1,
    delay: 0.3,
    color: HERO_COLORS.cream,
  },

  {
    id: 's5',
    top: '15%',
    left: '12%',
    variant: 'dot',
    size: 5,
    duration: 3.4,
    delay: 0.9,
    color: HERO_COLORS.cream,
    visibility: 'hidden sm:inline-block',
  },
  {
    id: 's6',
    top: '12%',
    left: '84%',
    variant: 'diamond',
    size: 8,
    duration: 3.8,
    delay: 0.2,
    color: HERO_COLORS.yellow,
    visibility: 'hidden sm:inline-block',
  },
  {
    id: 's7',
    top: '40%',
    left: '90%',
    variant: 'sparkle',
    size: 11,
    duration: 4.4,
    delay: 1.7,
    color: HERO_COLORS.lavenderLight,
    visibility: 'hidden sm:inline-block',
  },

  {
    id: 's8',
    top: '36%',
    left: '82%',
    variant: 'dot',
    size: 4,
    duration: 2.8,
    delay: 1.9,
    color: HERO_COLORS.cream,
    visibility: 'hidden md:inline-block',
  },
  {
    id: 's9',
    top: '4%',
    left: '58%',
    variant: 'diamond',
    size: 6,
    duration: 3.5,
    delay: 0.7,
    color: HERO_COLORS.lavenderLight,
    visibility: 'hidden md:inline-block',
  },
  {
    id: 's10',
    top: '48%',
    left: '20%',
    variant: 'dot',
    size: 5,
    duration: 4.7,
    delay: 1.2,
    color: HERO_COLORS.yellow,
    visibility: 'hidden md:inline-block',
  },
  {
    id: 's11',
    top: '2%',
    left: '34%',
    variant: 'sparkle',
    size: 9,
    duration: 2.7,
    delay: 2.1,
    color: HERO_COLORS.cream,
    visibility: 'hidden md:inline-block',
  },
  {
    id: 's12',
    top: '58%',
    left: '8%',
    variant: 'diamond',
    size: 6,
    duration: 3.0,
    delay: 1.5,
    color: HERO_COLORS.lavenderLight,
    visibility: 'hidden md:inline-block',
  },
  {
    id: 's13',
    top: '25%',
    left: '94%',
    variant: 'dot',
    size: 5,
    duration: 3.1,
    delay: 0.4,
    color: HERO_COLORS.cream,
  },
  {
    id: 's14',
    top: '47%',
    left: '3%',
    variant: 'diamond',
    size: 6,
    duration: 3.9,
    delay: 1.3,
    color: HERO_COLORS.yellow,
  },
  {
    id: 's15',
    top: '31%',
    left: '32%',
    variant: 'dot',
    size: 4,
    duration: 2.9,
    delay: 1.8,
    color: HERO_COLORS.lavenderLight,
    visibility: 'hidden sm:inline-block',
  },
  {
    id: 's16',
    top: '50%',
    left: '93%',
    variant: 'sparkle',
    size: 8,
    duration: 4.3,
    delay: 0.8,
    color: HERO_COLORS.cream,
    visibility: 'hidden sm:inline-block',
  },
  {
    id: 's17',
    top: '9%',
    left: '23%',
    variant: 'diamond',
    size: 6,
    duration: 3.3,
    delay: 2.2,
    color: HERO_COLORS.yellow,
    visibility: 'hidden sm:inline-block',
  },
  {
    id: 's18',
    top: '18%',
    left: '53%',
    variant: 'dot',
    size: 5,
    duration: 3.7,
    delay: 1.0,
    color: HERO_COLORS.yellow,
    visibility: 'hidden md:inline-block',
  },
  {
    id: 's19',
    top: '45%',
    left: '73%',
    variant: 'diamond',
    size: 6,
    duration: 4.5,
    delay: 2.4,
    color: HERO_COLORS.cream,
    visibility: 'hidden md:inline-block',
  },
  {
    id: 's20',
    top: '62%',
    left: '95%',
    variant: 'sparkle',
    size: 8,
    duration: 3.4,
    delay: 1.6,
    color: HERO_COLORS.lavenderLight,
    visibility: 'hidden md:inline-block',
  },
]

/** Dream / imagination — a limited, staggered scatter of stars, mostly in negative space. */
function HeroStarfield() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <style>{`
        .hero-star-twinkle {
          animation: heroStarTwinkle var(--hero-star-duration, 3s) ease-in-out infinite var(--hero-star-delay, 0s);
        }
        @keyframes heroStarTwinkle {
          0%, 100% { opacity: 0.48; scale: 0.96; }
          50%      { opacity: 0.85; scale: 1.03; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-star-twinkle { animation: none; opacity: 0.72; scale: 1; }
        }
      `}</style>
      {STARS.map((spec) => (
        <Star key={spec.id} spec={spec} />
      ))}
    </div>
  )
}

export default memo(HeroStarfield)
