import type { Metadata } from 'next'
import type { ReactElement } from 'react'
import StoryGallery from '@/components/organisms/StoryGallery'
import { GALLERY_CONTENT } from '@/content/gallery'
import { SITE_NAME } from '@/lib/site'

const socialTitle = `${GALLERY_CONTENT.metadata.title} | ${SITE_NAME}`

export const metadata: Metadata = {
  ...GALLERY_CONTENT.metadata,
  alternates: { canonical: '/gallery' },
  openGraph: {
    ...GALLERY_CONTENT.metadata,
    title: socialTitle,
    type: 'website',
    siteName: 'Icegotcha',
  },
  twitter: { ...GALLERY_CONTENT.metadata, title: socialTitle, card: 'summary' },
}

export default function GalleryPage(): ReactElement {
  return (
    <main id="main-content" tabIndex={-1} className="scroll-mt-20 focus:outline-none">
      <StoryGallery />
    </main>
  )
}
