import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import HeroSparkBurst from '.'

const meta = {
  title: 'Atoms/HeroSparkBurst',
  component: HeroSparkBurst,
  parameters: { layout: 'centered' },
  args: {
    x: 50,
    y: 50,
    radius: 112,
    reducedMotion: false,
    onComplete: () => undefined,
  },
  decorators: [
    (Story) => (
      <div className="relative h-52 w-80 overflow-hidden bg-[#6C5AAE]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HeroSparkBurst>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
