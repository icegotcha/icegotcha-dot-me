import { getHeroImageProps } from '@/lib/heroImages'
import type { ReactElement } from 'react'
import HeroDoodleCanvas from '@/components/atoms/HeroDoodleCanvas'

/** Original paper and live doodle; the sketchbook trigger pairs it with the pencil. */
export default function HeroDrawingSheet(): ReactElement {
  return (
    <div className="relative h-full w-full rotate-[8deg]">
      <img
        loading="lazy"
        fetchPriority="low"
        decoding="async"
        {...getHeroImageProps('/images/hero/drawing.webp')}
        alt=""
        className="h-full w-full object-contain"
        draggable={false}
      />
      <div className="pointer-events-none absolute left-[28%] top-[29%] z-10 h-[42%] w-[40%] -rotate-[12deg]">
        <HeroDoodleCanvas />
      </div>
    </div>
  )
}
