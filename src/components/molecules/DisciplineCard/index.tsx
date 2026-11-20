import type { ReactElement } from 'react'
import { Check, type LucideIcon } from 'lucide-react'
import { PIXEL } from '@/lib/fonts'

interface DisciplineCardProps {
  title: string
  description: string
  items: readonly string[]
  icon: LucideIcon
  imageSrc: string
}

export default function DisciplineCard({
  title,
  description,
  items,
  icon: Icon,
  imageSrc,
}: DisciplineCardProps): ReactElement {
  return (
    <article className="dream-card relative isolate overflow-hidden p-7 lg:p-9">
      <Icon size={26} className="mb-4 text-[#FFD37C]" aria-hidden="true" />
      <h3 className="mb-2 text-3xl" style={PIXEL}>
        {title}
      </h3>
      <p className="mb-5 max-w-[29ch] text-sm text-[#D5CCE6]">{description}</p>
      <ul className="relative z-10 space-y-3 text-sm">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-3">
            <Check size={14} className="text-[#FFD03A]" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
      <img
        src={imageSrc}
        alt=""
        loading="lazy"
        width={1200}
        height={800}
        decoding="async"
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover object-right"
        style={{
          filter: 'grayscale(0.35) sepia(0.3) hue-rotate(220deg) saturate(1.7) brightness(0.9)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,#171225_0%,rgba(23,18,37,0.93)_30%,rgba(23,18,37,0.78)_55%,rgba(23,18,37,0.1)_100%)]"
      />
    </article>
  )
}
