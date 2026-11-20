import Button from '@/components/atoms/Button'
import type { ReactElement } from 'react'
import { BriefcaseBusiness, CalendarDays } from 'lucide-react'
import SectionHeader from '@/components/atoms/SectionHeader'
import StoryReveal from '@/components/atoms/StoryReveal'
import { LINKS } from '@/content/links'
import { STORY_CONTENT } from '@/content/story'
import { PIXEL } from '@/lib/fonts'

export default function ProfessionalExperience(): ReactElement {
  const resume = LINKS.find((link) => link.label === 'Resume')
  const experience = STORY_CONTENT.professionalExperience
  return (
    <section
      aria-labelledby="experience-heading"
      className="dream-section bg-[rgba(175,135,188,0.06)]"
    >
      <div className="mx-auto max-w-[880px]">
        <div id="experience-heading">
          <SectionHeader label={experience.heading} />
        </div>
        <ul className="divide-y divide-white/10">
          {experience.roles.map((role) => (
            <li key={`${role.company}-${role.title}`} className="py-8 first:pt-0 md:py-10">
              <StoryReveal className="grid grid-cols-[22px_minmax(0,1fr)] gap-x-3 md:gap-x-4">
                <BriefcaseBusiness
                  size={22}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="mt-1 text-[#FFD03A]"
                />
                <div>
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-baseline lg:justify-between lg:gap-8">
                    <h3
                      className="min-w-0 text-balance text-2xl leading-tight text-[#F7EFE2]"
                      style={PIXEL}
                    >
                      {role.company}
                    </h3>
                    <p className="flex shrink-0 items-center gap-2 text-sm tabular-nums text-[#DCD3F2]">
                      <CalendarDays size={16} strokeWidth={1.5} aria-hidden="true" />
                      {role.period}
                    </p>
                  </div>
                  <p className="mt-3 text-base text-[#F2E5FA]">{role.title}</p>
                  <p className="mt-3 max-w-[68ch] text-pretty text-sm leading-7 text-[#D5CCE6]">
                    {role.description}
                  </p>
                </div>
              </StoryReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
