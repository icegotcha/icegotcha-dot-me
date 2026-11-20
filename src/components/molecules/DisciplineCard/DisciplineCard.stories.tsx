import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Code2 } from 'lucide-react'
import DisciplineCard from '.'

const meta = {
  title: 'Molecules/DisciplineCard',
  component: DisciplineCard,
  args: {
    title: 'Engineering',
    description: 'Turning ideas into real experiences. Code as craft, with a little personality.',
    items: [
      'Web applications',
      'Frontend & backend development',
      'Thoughtful UI implementation',
      'Clear solutions & documentation',
    ],
    icon: Code2,
    imageSrc: '/images/portfolio/kevin-ku-w7ZyuGYNpRQ-unsplash.webp',
  },
  argTypes: { icon: { control: false } },
  decorators: [
    (Story) => (
      <div className="max-w-xl p-5">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DisciplineCard>

export default meta
type Story = StoryObj<typeof meta>

export const Engineering: Story = {}
