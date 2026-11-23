import type { Metadata } from 'next'
import type { ReactElement, ReactNode } from 'react'
import Nav from '@/components/organisms/Nav'
import Footer from '@/components/molecules/Footer'
import SiteInteractionGuard from '@/components/atoms/SiteInteractionGuard'
import { MONO } from '@/lib/fonts'
import { SITE_URL } from '@/lib/site'
import { Pixelify_Sans, Press_Start_2P, Share_Tech_Mono } from 'next/font/google'

import '@/styles/index.css'

// Canonical URLs are set per page: a relative canonical here would resolve
// against metadataBase and point every route at the homepage.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Icegotcha | Creative Technologist',
  description:
    'Portfolio of Kotchakorn Wongwisutigul, a software developer, novelist, and illustrator working across code, story, and image.',
  openGraph: {
    title: 'Icegotcha | Creative Technologist',
    description: 'Software, stories, and illustrated worlds by Kotchakorn Wongwisutigul.',
    type: 'website',
    siteName: 'Icegotcha',
  },
  twitter: {
    card: 'summary',
    title: 'Icegotcha | Creative Technologist',
    description: 'Software, stories, and illustrated worlds by Kotchakorn Wongwisutigul.',
  },
}

// Google Font loaders, exposed as CSS variables. Kept here (not in
// `@/lib/fonts`) so `next/font` stays out of the component graph - otherwise
// Storybook's nextjs-vite font plugin tries to fetch these at transform time.
const pixelify = Pixelify_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-pixelify',
})

const pressStart = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-press-start',
  fallback: ['monospace'],
})

const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-share-tech',
  fallback: ['monospace'],
})

const fontVariables = `${pixelify.variable} ${pressStart.variable} ${shareTechMono.variable}`

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>): ReactElement {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <SiteInteractionGuard />
        <div
          className="min-h-[100dvh] overflow-x-hidden text-[#FBF9FF]"
          style={{
            background: 'var(--page-background)',
            ...MONO,
          }}
        >
          <div
            className="pointer-events-none fixed inset-0 z-50 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '180px',
            }}
          />
          <Nav />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
