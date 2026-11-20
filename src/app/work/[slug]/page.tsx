import type { Metadata } from 'next'
import type { ReactElement } from 'react'
import { notFound } from 'next/navigation'
import WorkDetail from '@/components/organisms/WorkDetail'
import { WORKS } from '@/content/works'
import { fetchGitHubReadme } from '@/lib/githubReadme'
import type { Work } from '@/types'

interface WorkPageProps {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false
export const revalidate = 3600

export function generateStaticParams(): { slug: string }[] {
  return WORKS.map((work) => ({ slug: work.slug }))
}

function getWork(slug: string): Work {
  const work = WORKS.find((project) => project.slug === slug)
  if (!work) notFound()
  return work
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const work = getWork((await params).slug)
  const title = `${work.title} | Icegotcha`
  return {
    title,
    description: work.excerpt,
    openGraph: { title, description: work.excerpt, type: 'website', siteName: 'Icegotcha' },
    twitter: { title, description: work.excerpt, card: 'summary' },
  }
}

export default async function WorkPage({ params }: WorkPageProps): Promise<ReactElement> {
  const work = getWork((await params).slug)
  const index = WORKS.indexOf(work)
  const readme = work.githubReadme ? await fetchGitHubReadme(work.githubReadme) : null
  return (
    <WorkDetail
      work={readme ? { ...work, markdownContent: readme } : work}
      markdownSource={readme ? work.githubReadme : undefined}
      previous={WORKS[index - 1]}
      next={WORKS[index + 1]}
    />
  )
}
