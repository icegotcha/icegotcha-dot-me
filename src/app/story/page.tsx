import type { Metadata } from 'next'
import type { ReactElement } from 'react'
import StoryHero from '@/components/organisms/StoryHero'
import StoryChapters from '@/components/organisms/StoryChapters'
import StoryPrinciples from '@/components/organisms/StoryPrinciples'
import ProfessionalExperience from '@/components/organisms/ProfessionalExperience'
import StoryClosing from '@/components/organisms/StoryClosing'
import { STORY_CONTENT } from '@/content/story'

export const metadata: Metadata = {
  ...STORY_CONTENT.metadata,
  openGraph: { ...STORY_CONTENT.metadata, type: 'website', siteName: 'Icegotcha' },
  twitter: { ...STORY_CONTENT.metadata, card: 'summary' },
}

export default function StoryPage(): ReactElement {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="scroll-mt-20 focus:outline-none [&_h2]:text-balance [&_h2>span]:shrink-0"
    >
      <StoryHero />
      <StoryChapters />
      <StoryPrinciples />
      <ProfessionalExperience />
      <StoryClosing />
    </main>
  )
}
