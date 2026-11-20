import type { ReactElement } from 'react'
import BrandIcon from '@/components/atoms/BrandIcon'

interface TechStackProps {
  skills: readonly { name: string; icon: string }[]
}

export default function TechStack({ skills }: TechStackProps): ReactElement {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-4" aria-label="Technology stack">
      {skills.map((skill) => (
        <li key={skill.name}>
          <BrandIcon path={skill.icon} label={skill.name} />
        </li>
      ))}
    </ul>
  )
}
