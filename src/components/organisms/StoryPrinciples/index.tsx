import type { ReactElement } from 'react'
import { Compass, Code2, BookOpen, Sparkles } from 'lucide-react'
import SectionHeader from '@/components/atoms/SectionHeader'
import StoryReveal from '@/components/atoms/StoryReveal'
import { STORY_CONTENT } from '@/content/story'
import { PIXEL } from '@/lib/fonts'

const PRINCIPLE_ICONS = [Compass, Code2, BookOpen, Sparkles] as const

export default function StoryPrinciples(): ReactElement {
  return (
    <section className="dream-section border-b-0">
      <div className="mx-auto max-w-[640px] lg:max-w-none">
        <SectionHeader label={STORY_CONTENT.principlesHeading} />
        <StoryReveal>
          <ul className="grid gap-x-12 sm:grid-cols-2">
            {STORY_CONTENT.principles.map((principle, index) => {
              const Icon = PRINCIPLE_ICONS[index]
              return (
                <li key={principle.title} className="flex gap-4 border-t border-white/10 py-7">
                  {Icon ? (
                    <Icon
                      size={26}
                      strokeWidth={1.3}
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-[#FFD03A]"
                    />
                  ) : null}
                  <div>
                    <h3 className="mb-2 text-balance text-2xl text-[#F7EFE2]" style={PIXEL}>
                      {principle.title}
                    </h3>
                    <p className="max-w-[40ch] text-pretty text-sm leading-7 text-[#D5CCE6]">
                      {principle.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </StoryReveal>
      </div>
    </section>
  )
}
