import type { ReactElement } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Work } from '@/types'
import { PIXEL } from '@/lib/fonts'

interface ProjectNavigationProps {
  previous?: Work
  next?: Work
}

export default function ProjectNavigation({
  previous,
  next,
}: ProjectNavigationProps): ReactElement {
  return (
    <nav aria-label="Project navigation" className="mt-12 border-t border-white/20 py-12">
      <div className="grid gap-6 sm:grid-cols-2">
        {[
          {
            work: previous,
            label: 'Previous project',
            position: 'sm:col-start-1',
            arrow: ArrowLeft,
          },
          {
            work: next,
            label: 'Next project',
            position: 'sm:col-start-2',
            arrow: ArrowRight,
          },
        ].map(({ work, label, position, arrow: Arrow }) =>
          work ? (
            <Link
              key={label}
              href={`/work/${work.slug}`}
              className={`flex min-w-0 items-center gap-4 rounded-xl border border-white/15 p-4 transition-colors hover:border-[#FFD03A]/60 focus-visible:outline-2 focus-visible:outline-[#FFD03A] ${position}`}
            >
              {label === 'Previous project' && (
                <Arrow className="shrink-0 text-[#FFD37C]" size={22} aria-hidden="true" />
              )}
              <Image
                src={work.image.src}
                alt=""
                width={1200}
                height={800}
                sizes="80px"
                loading="lazy"
                className="h-16 w-20 shrink-0 rounded-lg object-cover"
              />
              <span className="min-w-0">
                <span className="text-xs text-[#C7BBD9]">{label}</span>
                <span className="mt-1 block break-words text-xl" style={PIXEL}>
                  {work.title}
                </span>
              </span>
              {label === 'Next project' && (
                <Arrow className="ml-auto shrink-0 text-[#FFD37C]" size={22} aria-hidden="true" />
              )}
            </Link>
          ) : null
        )}
      </div>
      <div className="mt-8 flex justify-center">
        <Link
          href="/#work"
          className="inline-flex min-h-11 items-center text-[#FFD37C] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-[#FFD03A]"
        >
          Back to All Projects
        </Link>
      </div>
    </nav>
  )
}
