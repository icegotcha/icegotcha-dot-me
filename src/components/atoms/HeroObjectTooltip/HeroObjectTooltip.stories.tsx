import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import HeroObjectTooltip from '.'
const meta = {
  title: 'Atoms/HeroObjectTooltip',
  component: HeroObjectTooltip,
  args: { children: 'Click!' },
  decorators: [
    (Story) => (
      <button type="button" className="group relative m-16 h-20 w-20 text-white">
        Hover or focus
        <Story />
      </button>
    ),
  ],
} satisfies Meta<typeof HeroObjectTooltip>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
