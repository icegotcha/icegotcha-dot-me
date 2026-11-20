import Button from '@/components/atoms/Button'
import type { ReactElement } from 'react'
import { ArrowRight } from 'lucide-react'
import TechStack from '@/components/molecules/TechStack'
import InteractiveHero from '@/components/organisms/InteractiveHero'
import { HERO_CONTENT, TECH_SKILLS } from '@/content/home'
import { PIXEL, MONO } from '@/lib/fonts'

export default function HeroSection(): ReactElement {
  const [firstLine, ...restLines] = HERO_CONTENT.headlineLines

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden border-b border-white/10 pt-24 lg:pt-32"
    >
      <div className="dream-stars pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="mx-auto grid max-w-[1200px] items-center px-6 md:px-10 lg:min-h-[640px] lg:grid-cols-[1fr_1.12fr] lg:gap-2">
        <div className="relative z-10 pb-4 lg:pb-20">
          <h1 className="mb-5 text-[clamp(2.2rem,4.1vw,3.5rem)] leading-[1.12]" style={PIXEL}>
            <span className="mb-2 block">
              {firstLine} <span className="text-[#FFD03A]">{HERO_CONTENT.highlightWord}</span>
            </span>
            {restLines.map((line) => (
              <span key={line} className="block text-[0.65em] lg:text-[0.58em]">
                {line}
              </span>
            ))}
          </h1>
          <p className="max-w-[46ch] text-base leading-relaxed text-[#D5CCE6]" style={MONO}>
            {HERO_CONTENT.description}
          </p>
          <div className="mt-10">
            <p className="mb-4 text-[0.65rem] uppercase tracking-[0.25em] text-[#C4A9DC]">
              Tech stack
            </p>
            <TechStack skills={TECH_SKILLS} />
          </div>
        </div>
        <InteractiveHero />
      </div>
    </section>
  )
}
