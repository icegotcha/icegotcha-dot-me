import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { WORKS } from '@/content/works'
import WorkCard from '.'

const meta = {
  title: 'Molecules/WorkCard',
  component: WorkCard,
  args: { work: WORKS[0], number: 1 },
  decorators: [
    (Story) => (
      <div className="max-w-sm p-5">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WorkCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
