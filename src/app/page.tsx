import type { Metadata } from 'next'
import type { ReactElement } from 'react'
import HeroSection from '@/components/organisms/HeroSection'
import AboutSection from '@/components/organisms/AboutSection'
import DisciplinesSection from '@/components/organisms/DisciplinesSection'
import WorksSection from '@/components/organisms/WorksSection'
import WritingSection from '@/components/organisms/WritingSection'
import ContactSection from '@/components/organisms/ContactSection'
import ExpertiseSection from '@/components/organisms/ExpertiseSection'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function Page(): ReactElement {
  return (
    <main id="main-content">
      <HeroSection />
      <AboutSection />
      <DisciplinesSection />
      <WorksSection />
      <ExpertiseSection />
      <WritingSection />
      <ContactSection />
    </main>
  )
}
