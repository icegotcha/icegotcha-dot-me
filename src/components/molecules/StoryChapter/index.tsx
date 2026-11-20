import type { ReactElement } from 'react'
import SectionHeader from '@/components/atoms/SectionHeader'
import StoryReveal from '@/components/atoms/StoryReveal'
import type { StoryChapter as StoryChapterContent } from '@/types'

interface StoryChapterProps {
  chapter: StoryChapterContent
}

export default function StoryChapter({ chapter }: StoryChapterProps): ReactElement {
  return (
    <section id={chapter.id} className="scroll-mt-24">
      <StoryReveal className="w-full">
        <div>
          <SectionHeader label={chapter.heading} />
          <div className="space-y-5 text-pretty text-base leading-7 text-[#D5CCE6]">
            {chapter.paragraph.split(/\n\s*\n/).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </StoryReveal>
    </section>
  )
}
