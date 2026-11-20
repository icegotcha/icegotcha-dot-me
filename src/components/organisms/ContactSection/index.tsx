import type { ReactElement } from 'react'
import SectionHeader from '@/components/atoms/SectionHeader'
import ContactForm from '@/components/molecules/ContactForm'
import { PIXEL, MONO } from '@/lib/fonts'

export default function ContactSection(): ReactElement {
  return (
    <section className="dream-section border-b-0" id="contact">
      <SectionHeader label="get in touch" />

      <div className="grid grid-cols-1 gap-10 rounded-2xl border border-[rgba(251,249,255,0.18)] bg-[rgba(255,255,255,0.05)] p-7 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-14 md:p-12">
        <div>
          <p
            className="mb-4 max-w-[14ch] text-[clamp(2rem,6vw,4.2rem)] leading-[1.02] text-[#FBF9FF]"
            style={PIXEL}
          >
            Let&apos;s create <span className="text-[#FFD03A]">something</span> together.
          </p>
          <p
            className="max-w-[48ch] text-sm leading-relaxed text-[rgba(251,249,255,0.76)]"
            style={MONO}
          >
            Open to collaborations, commissions, and conversations about creativity, technology, and
            the space between.
          </p>
        </div>

        <ContactForm />
      </div>
    </section>
  )
}
