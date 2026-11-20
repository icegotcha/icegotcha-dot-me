import type { ReactElement } from 'react'
import { ArrowDown, BookOpen, Sparkles } from 'lucide-react'
import { STORY_CONTENT } from '@/content/story'
import { MONO, PIXEL, PRESS } from '@/lib/fonts'

export default function StoryHero(): ReactElement {
  const { hero } = STORY_CONTENT
  return (
    <section
      aria-labelledby="story-title"
      className="dream-section relative isolate overflow-hidden pb-12 pt-28 sm:pt-36 md:pb-20 md:pt-40"
    >
      <div aria-hidden="true" className="dream-stars pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto max-w-[760px] text-center">
        <div
          aria-hidden="true"
          className="mb-8 flex items-center justify-center gap-5 text-[#FFD03A]"
        >
          <Sparkles size={20} strokeWidth={1.3} />
          <BookOpen size={48} strokeWidth={1} />
          <Sparkles size={16} strokeWidth={1.3} />
        </div>
        <p
          className="mb-6 text-[0.6rem] leading-loose tracking-widest text-[#FFD03A]"
          style={PRESS}
        >
          {hero.eyebrow}
        </p>
        <h1
          id="story-title"
          className="text-balance text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.1] text-[#F7EFE2]"
          style={PIXEL}
        >
          {hero.title}
        </h1>
        <p
          className="mx-auto mt-6 max-w-[54ch] whitespace-pre-line text-pretty text-base leading-7 text-[#D5CCE6]"
          style={MONO}
        >
          {hero.description}
        </p>
        <a
          href="#the-developer"
          className="mt-10 inline-flex min-h-11 items-center gap-3 text-sm text-[#FFD03A] rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD03A]"
        >
          {hero.scrollLabel}
          <ArrowDown size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
