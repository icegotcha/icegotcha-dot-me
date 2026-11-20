'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useId, type ReactElement } from 'react'
import HeroDrawingSheet from '@/components/atoms/HeroDrawingSheet'
import HeroPencil from '@/components/atoms/HeroPencil'
import HeroObjectTooltip from '@/components/atoms/HeroObjectTooltip'

/** Both original layers share the same hover lift and parallax placement. */
export default function HeroSketchbookTrigger(): ReactElement {
  const tooltipId = useId()
  return (
    <Dialog.Trigger asChild>
      <button
        type="button"
        aria-label="Open Little Sketchbook"
        aria-describedby={tooltipId}
        className="group relative block min-h-11 min-w-11 w-full cursor-pointer border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD03A]"
      >
        <div className="transition-transform duration-200 group-hover:-translate-y-1 group-focus-visible:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none">
          <HeroDrawingSheet />
          <div className="pointer-events-none absolute inset-0 origin-center transition-transform duration-200 group-hover:-rotate-2 group-focus-visible:-rotate-2 motion-reduce:transform-none motion-reduce:transition-none">
            <HeroPencil />
          </div>
        </div>
        <HeroObjectTooltip id={tooltipId}>Let&apos;s draw! ✦</HeroObjectTooltip>
      </button>
    </Dialog.Trigger>
  )
}
