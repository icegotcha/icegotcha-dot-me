'use client'

import { WorkCategory } from '@/types'

import Button from '@/components/atoms/Button'

import { useState, type ReactElement } from 'react'
import SectionHeader from '@/components/atoms/SectionHeader'
import WorkCard from '@/components/molecules/WorkCard'
import { WORKS } from '@/content/works'
import { PIXEL } from '@/lib/fonts'

const FILTERS = ['All', 'Software', 'Writing', 'Art & experiments'] as const
type WorkFilter = (typeof FILTERS)[number]

const EMPTY_DESCRIPTIONS: Record<WorkFilter, string> = {
  All: 'New projects are taking shape. Check back soon to explore my work.',
  Software: 'New software projects are taking shape. Check back soon for more.',
  Writing: 'Stories and imagined worlds are taking shape. Check back soon for my writing.',
  'Art & experiments':
    'Illustrations and creative experiments are taking shape. Check back soon for more.',
}

function matchesFilter(category: WorkCategory, filter: WorkFilter): boolean {
  if (filter === 'All') return true
  if (filter === 'Software')
    return category === WorkCategory.Software || category === WorkCategory.BrowserGame
  if (filter === 'Writing') return category === WorkCategory.Novel
  return category === WorkCategory.AIExperiment || category === WorkCategory.IllustrationSeries
}

export default function WorksSection(): ReactElement {
  const [filter, setFilter] = useState<WorkFilter>('All')
  const visibleWorks = WORKS.filter((work) => matchesFilter(work.category, filter))

  return (
    <section className="dream-section" id="work">
      <SectionHeader label="work" />
      <p className="-mt-3 mb-6 max-w-[65ch] text-sm leading-relaxed text-[#C7BBD9]">
        A collection of software, stories, and creative experiments. Different mediums, the same
        curiosity.
      </p>
      <div className="mb-7 flex flex-wrap gap-3" role="group" aria-label="Filter selected work">
        {FILTERS.map((item) => (
          <Button
            variant="plain"
            key={item}
            type="button"
            aria-pressed={filter === item}
            aria-controls="selected-work-results"
            onClick={() => setFilter(item)}
            className={`min-h-10 rounded-full border px-5 py-2 text-sm transition-colors ${filter === item ? 'border-[#FFD03A] bg-[#FFD03A] text-[#20152F] shadow-[0_0_18px_#FFD03A30]' : 'border-white/20 bg-white/5 text-[#D5CCE6] hover:border-[#FFD03A]/60'}`}
          >
            {item}
          </Button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {visibleWorks.length === 0
          ? `${filter}: Coming Soon`
          : `${visibleWorks.length} projects shown`}
      </p>
      <div id="selected-work-results" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleWorks.length === 0 ? (
          <div className="col-span-full rounded-xl border border-white/15 bg-white/5 px-5 py-14 text-center sm:py-20">
            <h3 className="mb-3 text-3xl text-[#FFD37C]" style={PIXEL}>
              Coming Soon
            </h3>
            <p className="mx-auto max-w-md text-sm leading-relaxed text-[#C7BBD9]">
              {EMPTY_DESCRIPTIONS[filter]}
            </p>
          </div>
        ) : (
          visibleWorks.map((work) => (
            <WorkCard key={work.title} work={work} number={WORKS.indexOf(work) + 1} />
          ))
        )}
      </div>
    </section>
  )
}
