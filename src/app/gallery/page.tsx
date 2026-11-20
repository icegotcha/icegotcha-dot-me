import type { Metadata } from 'next'
import type { ReactElement } from 'react'
import StoryGallery from '@/components/organisms/StoryGallery'
import { GALLERY_CONTENT } from '@/content/gallery'

export const metadata: Metadata = {
  ...GALLERY_CONTENT.metadata,
  openGraph: { ...GALLERY_CONTENT.metadata, type: 'website', siteName: 'Icegotcha' },
  twitter: { ...GALLERY_CONTENT.metadata, card: 'summary' },
}

export default function GalleryPage(): ReactElement {
  return (
    <main id="main-content" tabIndex={-1} className="scroll-mt-20 focus:outline-none">
      <StoryGallery />
    </main>
  )
}
