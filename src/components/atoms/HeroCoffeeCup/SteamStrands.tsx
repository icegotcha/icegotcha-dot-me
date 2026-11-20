import type { ReactElement } from 'react'

export type SteamShape = 'heart' | 'star'

const SHAPE_PATHS: Record<SteamShape, string> = {
  heart: 'M40 20 C 30 13 32 6 37 6 C 39 6 40 8 40 9 C 40 8 41 6 43 6 C 48 6 50 13 40 20 Z',
  star: 'M40 3 L 43 10 L 51 11 L 45 16 L 47 23 L 40 19 L 33 23 L 35 16 L 29 11 L 37 10 Z',
}

interface SteamStrandsProps {
  puffKey?: number
  puffShape?: SteamShape
}

/** 2-3 soft translucent curls that rise, bend, and fade — each an irregular Bézier, never identical waves. */
export default function SteamStrands({
  puffKey = 0,
  puffShape = 'heart',
}: SteamStrandsProps): ReactElement {
  return (
    <g>
      <style>{`
        .hero-steam {
          transform-box: fill-box;
          transform-origin: bottom center;
        }
        .hero-steam-1 { animation: heroSteamRise1 4.4s ease-in-out infinite; }
        .hero-steam-2 { animation: heroSteamRise2 5.1s ease-in-out infinite 1.3s; }
        .hero-steam-3 { animation: heroSteamRise3 4.7s ease-in-out infinite 2.6s; }

        @keyframes heroSteamRise1 {
          0%   { transform: translate(0px, 5px) scaleY(0.65); opacity: 0; }
          20%  { opacity: 0.48; }
          58%  { transform: translate(2px, -9px) scaleY(1); opacity: 0.4; }
          100% { transform: translate(-3px, -19px) scaleY(1.22); opacity: 0; }
        }
        @keyframes heroSteamRise2 {
          0%   { transform: translate(0px, 5px) scaleY(0.6) rotate(0deg); opacity: 0; }
          22%  { opacity: 0.42; }
          60%  { transform: translate(-3px, -10px) scaleY(1.05) rotate(-2deg); opacity: 0.36; }
          100% { transform: translate(2px, -21px) scaleY(1.25) rotate(2deg); opacity: 0; }
        }
        @keyframes heroSteamRise3 {
          0%   { transform: translate(0px, 4px) scaleY(0.7); opacity: 0; }
          18%  { opacity: 0.4; }
          56%  { transform: translate(3px, -8px) scaleY(1); opacity: 0.34; }
          100% { transform: translate(-2px, -18px) scaleY(1.18); opacity: 0; }
        }
        .hero-steam-puff { transform-box: fill-box; transform-origin: bottom center; animation: heroSteamPuff 1.4s ease-out both; }
        @keyframes heroSteamPuff {
          0% { transform: translateY(6px) scale(0.6); opacity: 0; }
          30% { opacity: 0.4; }
          100% { transform: translateY(-14px) scale(1.25); opacity: 0; }
        }
        .hero-steam-shape { transform-box: fill-box; transform-origin: center; animation: heroSteamShape 2.2s ease-out both; }
        @keyframes heroSteamShape {
          0%, 20% { transform: translateY(8px) scale(0.4); opacity: 0; }
          40% { transform: translateY(0) scale(1); opacity: 0.45; }
          70% { opacity: 0.35; }
          100% { transform: translateY(-5px) scale(1.05); opacity: 0; }
        }
        .hero-steam-ambient { opacity: 0; transform-box: fill-box; transform-origin: center; animation: heroSteamAmbient 18s ease-in-out infinite; }
        .hero-steam-ambient-star { animation-delay: 9s; }
        @keyframes heroSteamAmbient {
          0%, 28% { transform: translateY(16px) scale(0.65); opacity: 0; }
          36% { opacity: 0.38; }
          48% { transform: translateY(-2px) scale(0.85); opacity: 0; }
          100% { transform: translateY(-2px) scale(0.85); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-steam-1, .hero-steam-2, .hero-steam-3 { animation: none; opacity: 0.2; }
          .hero-steam-puff, .hero-steam-shape, .hero-steam-ambient { animation: none; opacity: 0; }
        }
      `}</style>
      <path
        className="hero-steam hero-steam-1"
        d="M 30 38 C 25 32 34 28 28 21 C 24 16 33 11 27 4"
        stroke="#B8BAC2"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        className="hero-steam hero-steam-2"
        d="M 39 38 C 44 30 34 25 40 17 C 45 11 35 7 41 -2"
        stroke="#B8BAC2"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        className="hero-steam hero-steam-3"
        d="M 47 38 C 51 31 44 26 49 19 C 53 13 45 9 50 1"
        stroke="#B8BAC2"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
      />
      {(['heart', 'star'] as const).map((shape) => (
        <path
          key={shape}
          className={`hero-steam-ambient hero-steam-ambient-${shape}`}
          d={SHAPE_PATHS[shape]}
          fill="none"
          stroke="#B8BAC2"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      ))}
      {puffKey > 0 && (
        <g key={puffKey}>
          <path
            className="hero-steam-puff"
            d="M 36 38 C 31 31 42 27 36 19 C 33 14 41 10 37 3"
            stroke="#B8BAC2"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            className="hero-steam-shape"
            d={SHAPE_PATHS[puffShape]}
            fill="none"
            stroke="#B8BAC2"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
        </g>
      )}
    </g>
  )
}
