import type { ReactElement } from 'react'
import { Code2, Feather } from 'lucide-react'
import SectionHeader from '@/components/atoms/SectionHeader'
import DisciplineCard from '@/components/molecules/DisciplineCard'

export default function DisciplinesSection(): ReactElement {
  return (
    <section className="dream-section" id="disciplines">
      <SectionHeader label="what I do" />
      <div className="grid gap-5 md:grid-cols-2">
        <DisciplineCard
          title="Engineering"
          description="Turning ideas into real experiences. Code as craft, with a little personality."
          items={[
            'Web applications',
            'Frontend & backend development',
            'Thoughtful UI implementation',
            'Clear solutions & documentation',
          ]}
          icon={Code2}
          imageSrc="/images/portfolio/kevin-ku-w7ZyuGYNpRQ-unsplash.webp"
        />
        <DisciplineCard
          title="Creative Exploration"
          description="Stories, illustrations, and experiments. Worlds waiting to be imagined."
          items={['Writing', 'Illustration', 'AI Experiments', 'Interactive']}
          icon={Feather}
          imageSrc="/images/portfolio/aaron-burden-y02jEX_B0O0-unsplash.webp"
        />
      </div>
    </section>
  )
}
