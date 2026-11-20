import Button from '@/components/atoms/Button'
import type { ReactElement } from 'react'
import { ArrowRight, ArrowUpRight, Star, BookOpen, Feather, Heart } from 'lucide-react'
import SectionHeader from '@/components/atoms/SectionHeader'
import { PIXEL, MONO } from '@/lib/fonts'
import Link from 'next/link'
import { LINKS } from '@/content/links'
import { STORY_CONTENT } from '@/content/story'

const TRAITS = [
  {
    title: 'Problem Solver',
    description: 'Breaking down complex problems and finding thoughtful solutions.',
    icon: Star,
  },
  {
    title: 'Lifelong Learner',
    description: 'Always curious, exploring new technologies and ideas.',
    icon: BookOpen,
  },
  {
    title: 'Creative Thinker',
    description: 'A touch of imagination in everything I build.',
    icon: Feather,
  },
  {
    title: 'Stories & small comforts',
    description: 'Inspired by fictional worlds, quiet moments, and a good cup of coffee.',
    icon: Heart,
  },
]

export default function AboutSection(): ReactElement {
  return (
    <section className="dream-section" id="about">
      <SectionHeader label="about me" />
      <div className="grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr] lg:grid-cols-[1.1fr_0.75fr_0.9fr]">
        <div>
          <h3 className="mb-5 text-4xl leading-tight text-[#F2E5FA]" style={PIXEL}>
            A Developer
            <br />
            and a World Builder.
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-[#D5CCE6]" style={MONO}>
            <p>My name is Kotchakorn Wongwisutigul. Most people call me Ice.</p>
            <p>
              I’m a software engineer building backend and frontend applications, turning complex
              ideas into clear, thoughtful experiences through design and strong documentation.
            </p>
            <p>
              Outside of code, I draw, write, and explore creativity and human psychology.
              Technology and storytelling help me make ideas easier to understand, use, and connect
              with.
            </p>
          </div>
          <div className="mt-6">
            <Button asChild>
              <Link
                href="/story"
                className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD03A]"
              >
                {STORY_CONTENT.aboutLinkLabel}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3" aria-label="Profile links">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex min-h-8 items-center gap-1 text-sm text-[#FFD03A] hover:underline"
              >
                {link.label}
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <div
          className="relative mx-auto aspect-[2/3] w-full max-w-[320px] overflow-hidden rounded-xl border border-[#AF87BC]/40 bg-[#261B3F]"
          aria-hidden="true"
        >
          <img
            src="/images/portfolio/about-v1.webp"
            alt=""
            width={800}
            height={1200}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="grid gap-6 md:col-span-2 md:grid-cols-2 lg:col-span-1 lg:grid-cols-1">
          {TRAITS.map(({ title, description, icon: Icon }) => (
            <div key={title} className="flex items-start gap-4">
              <Icon
                size={27}
                strokeWidth={1.3}
                className="mt-1 shrink-0 text-[#FFD37C]"
                aria-hidden="true"
              />
              <div>
                <h4 className="mb-1 text-base text-[#FBF9FF]">{title}</h4>
                <p className="text-sm leading-relaxed text-[#C7BBD9]">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
