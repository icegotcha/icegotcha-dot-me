import type { ReactElement } from 'react'
import { MONO } from '@/lib/fonts'
import { HERO_CODE_CONTENT } from '@/content/home'

/** Screen geometry follows the original artwork, without measuring or changing it. */
export default function CodeScreenOverlay(): ReactElement {
  return (
    <div
      className="pointer-events-none absolute left-[10%] top-[8%] h-[58%] w-[80%] overflow-hidden rounded-[4%] bg-[#191329]"
      style={{ containerType: 'inline-size' }}
    >
      <span className="sr-only">{HERO_CODE_CONTENT.lines.join('\n')}</span>
      <div
        aria-hidden="true"
        className="absolute inset-0 p-[6%] text-[4cqw] leading-[1.35] text-[#DCD3F2]"
        style={MONO}
      >
        <div className="mb-[4%] text-[3.5cqw] text-[#C4A9DC]">{HERO_CODE_CONTENT.filename}</div>
        {HERO_CODE_CONTENT.lines.map((line, index) => (
          <div
            key={line}
            className="hero-monitor-code whitespace-pre"
            style={{
              animationDelay: `${index * 140}ms`,
              color:
                index === 0 || index === HERO_CODE_CONTENT.lines.length - 1 ? '#FFD03A' : undefined,
            }}
          >
            {line}
          </div>
        ))}
      </div>
      <style>{`
        .hero-monitor-code { animation: hero-monitor-type 450ms steps(18, end) both; }
        @keyframes hero-monitor-type { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0); } }
        @media (prefers-reduced-motion: reduce) {
          .hero-monitor-code { animation: none; }
        }
      `}</style>
    </div>
  )
}
