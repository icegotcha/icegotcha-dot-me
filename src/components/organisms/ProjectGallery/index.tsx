'use client'

import { useMemo, useState, type ReactElement } from 'react'
import dynamic from 'next/dynamic'
import type { ProjectImage } from '@/types'
import { Gallery4 } from '@/components/ui/gallery4'

const ImageViewer = dynamic(() => import('@/components/molecules/ImageViewer'), { ssr: false })

interface ProjectGalleryProps {
  images: ProjectImage[]
}

export default function ProjectGallery({ images }: ProjectGalleryProps): ReactElement | null {
  const [viewer, setViewer] = useState<{ index: number; open: boolean } | null>(null)
  const slides = useMemo(
    () =>
      images.map((image) => ({
        src: image.src,
        alt: image.alt,
        description: image.caption?.trim() || undefined,
      })),
    [images]
  )

  function closeViewer(): void {
    setViewer((current) => (current ? { ...current, open: false } : null))
  }

  if (images.length === 0) return null

  return (
    <section id="gallery" className="min-w-0 scroll-mt-24 py-10 md:py-14">
      <Gallery4
        title="Visual showcase"
        onImageClick={(index) => setViewer({ index, open: true })}
        items={images.map((image) => ({
          id: image.src,
          title: image.caption?.trim() || image.alt,
          image: image.src,
          imageAlt: image.alt,
        }))}
      />
      {viewer && (
        <ImageViewer
          slides={slides}
          index={viewer.index}
          open={viewer.open}
          onClose={closeViewer}
        />
      )}
    </section>
  )
}
