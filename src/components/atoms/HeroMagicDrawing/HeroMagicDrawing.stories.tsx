import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import HeroMagicDrawing from '.'
import { MAGIC_DRAWINGS } from './drawings'

const meta = {
  title: 'Atoms/HeroMagicDrawing',
  component: HeroMagicDrawing,
  args: { index: 0 },
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="h-28 w-28">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HeroMagicDrawing>
export default meta
type Story = StoryObj<typeof meta>
export const Bunny: Story = {}
export const Collection: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      {MAGIC_DRAWINGS.map((drawing, index) => (
        <div key={drawing.name} className="h-24 w-24">
          <HeroMagicDrawing index={index} />
        </div>
      ))}
    </div>
  ),
}
