import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import HeroAmbientSparkles from '.'

const meta = {
  title: 'Atoms/HeroAmbientSparkles',
  component: HeroAmbientSparkles,
  decorators: [
    (Story) => (
      <div className="relative h-80 w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HeroAmbientSparkles>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
