import Image from 'next/image'
import type { ReactElement } from 'react'
import { ArrowUpRight } from 'lucide-react'
import MasonryGrid from '@/components/molecules/MasonryGrid'
import { GALLERY_CONTENT } from '@/content/gallery'
import { LINKS } from '@/content/links'

export default function StoryGallery(): ReactElement {
  const artworkLink = LINKS.find((link) => link.label === 'Artwork')

  return (
    <section
      aria-labelledby="gallery-title"
      className="dream-section border-b-0 pb-20 pt-28 sm:pt-36 md:pb-24 md:pt-40"
    >
      <MasonryGrid>
        {GALLERY_CONTENT.images.map((image, index) => (
          <Image
            key={image.img.src}
            src={image.img}
            alt={image.alt}
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : undefined}
            className="block h-auto w-full rounded-2xl"
          />
        ))}
      </MasonryGrid>
      {artworkLink && (
        <div className="mt-10 flex flex-wrap items-baseline justify-between gap-3 pt-6 sm:mt-14 sm:pt-8">
          <p className="text-sm text-[#C7BBD9]">Want to see more?</p>
          <a
            href={artworkLink.href}
            className="inline-flex min-h-11 items-center gap-1.5 text-sm text-[#FFD03A] underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD03A] motion-reduce:transition-none sm:text-base"
            aria-label="View my artwork on Instagram"
          >
            View more artwork on Instagram
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      )}
    </section>
  )
}
