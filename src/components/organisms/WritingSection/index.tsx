import Button from '@/components/atoms/Button'
import Image from 'next/image'
import type { ReactElement } from 'react'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/atoms/SectionHeader'
import headphonesDrawingImage from '@/assets/gallery/headphones-drawing.jpeg'
import { LINKS } from '@/content/links'
import { PIXEL } from '@/lib/fonts'

export default function WritingSection(): ReactElement {
  const writingLinks = LINKS.filter((link) => ['Blog', 'Medium'].includes(link.label))
  return (
    <section id="writing" className="dream-section relative isolate overflow-hidden">
      <SectionHeader label="beyond the code" />
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <h3 className="mb-4 text-3xl leading-tight" style={PIXEL}>
            Notes on building, learning, and creating.
          </h3>
          <p className="max-w-[48ch] text-sm leading-relaxed text-[#D5CCE6]">
            <span className="text-[#FFD03A]">
              I write to make sense of the things I learn and make.
            </span>{' '}
            My blogs bring together practical software notes, creative experiments, and reflections
            from the process behind my work.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {writingLinks.map((link) => (
              <Button
                asChild
                variant={link.label === 'Blog' ? 'primary' : 'outline'}
                key={link.label}
              >
                <a href={link.href}>
                  {link.label === 'Blog' ? 'Explore my writing' : link.label}
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
              </Button>
            ))}
          </div>
        </div>
        <div className="relative aspect-[3/2] min-h-64 overflow-hidden rounded-2xl border border-white/10 bg-[#1B142D]">
          <Image
            src={headphonesDrawingImage}
            alt="A colorful drawing of a girl with headphones writing at a desk"
            sizes="(min-width: 768px) 50vw, 100vw"
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
    </section>
  )
}
