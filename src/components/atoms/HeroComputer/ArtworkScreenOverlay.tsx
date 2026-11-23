import type { ReactElement } from 'react'
import { HERO_SCREEN_IMAGE } from '@/content/home'
import { getHeroImageProps } from '@/lib/heroImages'

export default function ArtworkScreenOverlay(): ReactElement {
  return (
    <div className="pointer-events-none absolute left-[10%] top-[8%] h-[58%] w-[80%] overflow-hidden rounded-[4%] bg-[#FFE9CF]">
      <img
        {...getHeroImageProps(HERO_SCREEN_IMAGE.src)}
        alt={HERO_SCREEN_IMAGE.alt}
        decoding="async"
        draggable={false}
        className="h-full w-full object-cover"
      />
    </div>
  )
}
