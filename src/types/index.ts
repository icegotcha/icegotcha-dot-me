import type { StaticImageData } from 'next/image'
import type { ComponentType } from 'react'

export enum WorkCategory {
  Novel = 'Novel',
  Software = 'Software',
  AIExperiment = 'AI Experiment',
  BrowserGame = 'Browser Game',
  IllustrationSeries = 'Illustration Series',
}

export enum WorkStatus {
  Planned = 'Planned',
  InProgress = 'In progress',
  Completed = 'Completed',
  Released = 'Released · Complete',
  ActiveDevelopment = 'Released · Ongoing',
}

export interface ProjectImage {
  src: string
  alt: string
  kind?: 'conceptual-illustration' | 'screenshot' | 'original-artwork'
  caption?: string
}

export interface ProjectTechnologyGroup {
  heading: string
  technologies: string[]
}

export interface GitHubReadmeSource {
  repository: string
  ref?: string
  path?: string
}

export interface WorkPreviewContent {
  component: ComponentType
  title: string
  description?: string
  address?: string
}

export interface Work {
  slug: string
  year: string
  category: WorkCategory
  title: string
  excerpt: string
  image: ProjectImage
  status: WorkStatus
  tags: string[]
  technologies?: string[]
  markdownContent?: string
  githubReadme?: GitHubReadmeSource
  preview?: WorkPreviewContent
  gallery?: ProjectImage[]
  links?: WorkLink[]
}

export interface WorkLink extends Link {
  kind?: 'github' | 'link'
}

export interface Link {
  label: string
  href: string
}

export interface HeroContent {
  headlineLines: readonly string[]
  highlightWord: string
  description: string
}

export interface TechSkill {
  name: string
  icon: string
}

export interface TechExpertise {
  title: string
  description: string
}

export interface PageMetadataContent {
  title: string
  description: string
}

export interface StoryIntroduction {
  title: string
  description: string
}

export interface StoryImage {
  img: StaticImageData
  alt: string
}

export interface StoryChapter {
  id: string
  heading: string
  image: StoryImage
  paragraph: string
}

export interface StoryPrinciple {
  title: string
  description: string
}

export interface StoryClosing {
  heading: string
  description: string
  workLabel: string
  resumeLabel: string
}

export interface ProfessionalRole {
  company: string
  title: string
  period: string
  description: string
}

export interface ProfessionalExperience {
  heading: string
  roles: readonly ProfessionalRole[]
}

export interface StoryContent {
  metadata: PageMetadataContent
  hero: {
    eyebrow: string
    title: string
    description: string
    scrollLabel: string
  }
  chapters: readonly StoryChapter[]
  principlesHeading: string
  principles: readonly StoryPrinciple[]
  professionalExperience: ProfessionalExperience
  closing: StoryClosing
  aboutLinkLabel: string
}

export interface GalleryContent {
  metadata: PageMetadataContent
  images: readonly StoryImage[]
}
