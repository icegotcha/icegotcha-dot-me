import type { ReactElement } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { sanitizeContentUrl } from '@/lib/githubReadme'
import ProjectMarkdown from '@/components/molecules/ProjectMarkdown'
import type { GitHubReadmeSource, Work } from '@/types'
import { Github, Link as LinkIcon } from 'lucide-react'
import ProjectNavigation from '@/components/molecules/ProjectNavigation'
import ProjectGallery from '@/components/organisms/ProjectGallery'
import { MONO, PIXEL } from '@/lib/fonts'

interface WorkDetailProps {
  work: Work
  markdownSource?: GitHubReadmeSource
  previous?: Work
  next?: Work
}

export default function WorkDetail({
  work,
  markdownSource,
  previous,
  next,
}: WorkDetailProps): ReactElement {
  const links = (work.links ?? [])
    .map((link) => ({ ...link, href: sanitizeContentUrl(link.href, 'link') }))
    .filter((link) => link.label.trim() && /^https?:\/\//i.test(link.href))

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto max-w-[1100px] scroll-mt-20 px-5 pt-24 focus:outline-none md:px-8 md:pt-32"
      style={MONO}
    >
      <article>
        <header id="project" className="scroll-mt-24 pb-10 md:pb-14">
          <Link
            href="/#work"
            className="inline-flex min-h-11 items-center text-sm text-[#FFD37C] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-[#FFD03A]"
          >
            ← Back to Work
          </Link>
          <p className="mb-3 mt-8 text-sm text-[#C7BBD9]">{work.category}</p>
          <h1
            className="max-w-[20ch] break-words text-[clamp(2.5rem,7vw,5rem)] leading-tight text-[#FBF9FF]"
            style={PIXEL}
          >
            {work.title}
          </h1>
          <p className="mt-5 w-full text-base leading-relaxed text-[#D5CCE6] md:text-lg">
            {work.excerpt}
          </p>
          {work.tags.length > 0 && (
            <ul aria-label="Project tags" className="mt-6 flex flex-wrap gap-2">
              {work.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-[#D5CCE6]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-5 border-y border-white/20 py-5 text-sm">
            <div>
              <dt className="mb-1 text-[#B8A8CC]">Timeline</dt>
              <dd>{work.year}</dd>
            </div>
            <div>
              <dt className="mb-1 text-[#B8A8CC]">Status</dt>
              <dd className="text-[#FFD37C]">{work.status}</dd>
            </div>
          </dl>
          <figure className="mt-10">
            <Image
              src={work.image.src}
              alt={work.image.alt}
              width={1200}
              height={800}
              sizes="(max-width: 1100px) 95vw, 1036px"
              loading="lazy"
              className="h-auto w-full rounded-2xl border border-white/20"
            />
            {work.image.caption?.trim() && (
              <figcaption className="mt-3 text-sm text-[#C7BBD9]">{work.image.caption}</figcaption>
            )}
          </figure>
          {links.length > 0 && (
            <nav aria-label="Project links" className="mt-6 flex flex-wrap items-center gap-2">
              <span className="mr-2 whitespace-nowrap text-sm text-[#C7BBD9]">Links:</span>
              {links.map((link) => {
                const Icon = link.kind === 'github' ? Github : LinkIcon
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${link.label} (opens in a new tab)`}
                    className="inline-flex size-11 items-center justify-center rounded-full text-[#FFD37C] hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD03A]"
                  >
                    <Icon size={20} aria-hidden="true" />
                    <span className="sr-only">{link.label} (opens in a new tab)</span>
                  </a>
                )
              })}
            </nav>
          )}
        </header>
        {work.markdownContent?.trim() && (
          <ProjectMarkdown content={work.markdownContent} source={markdownSource} />
        )}
        <ProjectGallery images={work.gallery ?? []} />
      </article>
      <ProjectNavigation previous={previous} next={next} />
    </main>
  )
}
