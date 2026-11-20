import type { ReactElement } from 'react'
import { Code2, FileCode2, Boxes, Cable, PanelsTopLeft, Server } from 'lucide-react'
import SectionHeader from '@/components/atoms/SectionHeader'
import ExpertiseCard from '@/components/molecules/ExpertiseCard'
import { TECH_EXPERTISE } from '@/content/home'
import { LINKS } from '@/content/links'

const EXPERTISE_ICONS = {
  'React & Next.js': Code2,
  TypeScript: FileCode2,
  'State Management': Boxes,
  'API Integration': Cable,
  'UI Engineering': PanelsTopLeft,
  'Backend Development': Server,
}

export default function ExpertiseSection(): ReactElement {
  const resume = LINKS.find((link) => link.label === 'Resume')
  return (
    <section id="expertise" className="dream-section">
      <div className="flex flex-wrap items-baseline justify-between gap-x-5">
        <SectionHeader label="technical expertise" />
        {resume && (
          <a href={resume.href} className="mb-6 text-sm text-[#FFD37C] hover:underline">
            View resume →
          </a>
        )}
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {TECH_EXPERTISE.map((skill) => (
          <ExpertiseCard
            key={skill.title}
            title={skill.title}
            description={skill.description}
            icon={EXPERTISE_ICONS[skill.title]}
          />
        ))}
      </ul>
    </section>
  )
}
