import type { ReactElement } from 'react'
import type { LucideIcon } from 'lucide-react'

interface ExpertiseCardProps {
  title: string
  description: string
  icon: LucideIcon
}

export default function ExpertiseCard({
  title,
  description,
  icon: Icon,
}: ExpertiseCardProps): ReactElement {
  return (
    <li className="dream-card px-4 py-6 text-center">
      <Icon
        aria-hidden="true"
        size={32}
        strokeWidth={1.5}
        className="mx-auto mb-4 text-[#DEC0EF]"
      />
      <h3 className="mb-2 text-base">{title}</h3>
      <p className="text-xs leading-relaxed text-[#C7BBD9]">{description}</p>
    </li>
  )
}
