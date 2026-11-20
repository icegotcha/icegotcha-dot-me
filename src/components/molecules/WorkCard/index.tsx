import Link from 'next/link'
import { WorkCategory } from '@/types'
import type { ReactElement } from 'react'
import type { Work } from '@/types'
import { PIXEL, MONO } from '@/lib/fonts'

interface WorkCardProps {
  work: Work
  number: number
}

export default function WorkCard({ work, number }: WorkCardProps): ReactElement {
  return (
    <article className="dream-card group flex flex-col overflow-hidden transition-colors hover:border-[#FFD03A]/60">
      <Link
        href={`/work/${work.slug}`}
        aria-label={`View ${work.title}`}
        className="flex h-full flex-col rounded-[inherit] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#FFD03A]"
      >
        <div className="relative flex h-48 shrink-0 items-center justify-center overflow-hidden border-b border-white/10 bg-[radial-gradient(ellipse_at_50%_100%,#695084_0%,#261C3D_50%,#141123_100%)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-[#100E20]/80 to-transparent"
          />
          <span className="absolute left-4 top-3 z-10 text-2xl text-[#F2E5FA]" style={PIXEL}>
            {String(number).padStart(2, '0')}
          </span>
          <span className="absolute right-3 top-4 z-10 rounded-full border border-white/20 bg-[#171225]/90 px-3 py-1 text-[0.6rem] uppercase tracking-widest">
            {work.category}
          </span>
          <img
            src={work.image.src}
            alt=""
            loading="lazy"
            width={work.category === WorkCategory.BrowserGame ? 800 : 1200}
            height={work.category === WorkCategory.BrowserGame ? 1200 : 800}
            decoding="async"
            className={`h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105 ${work.category === WorkCategory.BrowserGame ? 'object-[50%_85%]' : 'object-center'}`}
          />
        </div>
        <div className="flex flex-1 flex-col p-5" style={MONO}>
          <h3 className="mb-3 text-2xl leading-tight" style={PIXEL}>
            {work.title}
          </h3>
          <p className="mb-5 flex-1 text-sm leading-relaxed text-[#C7BBD9]">{work.excerpt}</p>
          {work.technologies && work.technologies.length > 0 && (
            <p className="mb-5 text-xs leading-relaxed text-[#B8A8CC]">
              <span className="mr-2 text-[#FFD37C]">Tech stack:</span>
              {work.technologies.join(' · ')}
            </p>
          )}
          {work.tags.length > 0 && (
            <ul aria-label="Project tags" className="mb-5 flex flex-wrap gap-2">
              {work.tags.map((tag) => (
                <li
                  key={tag}
                  className="max-w-full break-words rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-[#D5CCE6]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs">
            <span className="text-[#B8A8CC]">
              {work.year} · {work.category}
            </span>
            <span className="text-[#FFD37C]">{work.status}</span>
          </div>
        </div>
      </Link>
    </article>
  )
}
