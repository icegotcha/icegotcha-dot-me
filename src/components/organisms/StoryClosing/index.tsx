import Button from '@/components/atoms/Button'
import type { ReactElement } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import StoryReveal from '@/components/atoms/StoryReveal'
import { LINKS } from '@/content/links'
import { STORY_CONTENT } from '@/content/story'
import { PIXEL } from '@/lib/fonts'

export default function StoryClosing(): ReactElement {
  const { closing } = STORY_CONTENT
  const resume = LINKS.find((link) => link.label === 'Resume')
  return (
    <section className="dream-section border-b-0">
      <StoryReveal className="dream-card mx-auto max-w-[880px] px-6 py-10 text-center md:px-12 md:py-14">
        <h2
          className="text-balance text-3xl leading-tight text-[#F7EFE2] md:text-4xl"
          style={PIXEL}
        >
          {closing.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-[56ch] text-pretty text-base leading-7 text-[#D5CCE6]">
          {closing.description}
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
          <Button asChild>
            <Link
              href="/#work"
              className="whitespace-nowrap motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD03A]"
            >
              {closing.workLabel}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Button>
          {resume ? (
            <Button asChild variant="outline">
              <a
                href={resume.href}
                className="whitespace-nowrap motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD03A]"
              >
                {closing.resumeLabel}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </Button>
          ) : null}
        </div>
      </StoryReveal>
    </section>
  )
}
