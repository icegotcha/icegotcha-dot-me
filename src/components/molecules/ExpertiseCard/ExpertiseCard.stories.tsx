import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Code2 } from 'lucide-react'
import ExpertiseCard from '.'

const meta = {
  title: 'Molecules/ExpertiseCard',
  component: ExpertiseCard,
  args: {
    title: 'React & Next.js',
    description: 'Building scalable, interactive web applications',
    icon: Code2,
  },
  argTypes: { icon: { control: false } },
  decorators: [
    (Story) => (
      <ul className="grid max-w-56 list-none p-5">
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof ExpertiseCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
