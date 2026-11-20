import type { ReactElement } from 'react'
import type { ProjectTechnologyGroup } from '@/types'
import SectionHeader from '@/components/atoms/SectionHeader'
import { PIXEL } from '@/lib/fonts'

interface ProjectTechStackProps {
  groups: ProjectTechnologyGroup[]
}

export default function ProjectTechStack({ groups }: ProjectTechStackProps): ReactElement | null {
  const populated = groups.filter((group) => group.technologies.some((name) => name.trim()))
  if (!populated.length) return null

  return (
    <section id="tech-stack" className="scroll-mt-24 py-10 md:py-14">
      <SectionHeader label="Tools & technologies" />
      <div className="grid gap-8 sm:grid-cols-2">
        {populated.map((group) => (
          <div key={group.heading}>
            <h3 className="mb-3 text-2xl" style={PIXEL}>
              {group.heading}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.technologies
                .filter((name) => name.trim())
                .map((name) => (
                  <li
                    key={name}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-[#D5CCE6]"
                  >
                    {name}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
