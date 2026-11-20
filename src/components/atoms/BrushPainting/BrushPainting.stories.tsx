import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import BrushPainting from '.'

const meta = {
  title: 'Atoms/BrushPainting',
  component: BrushPainting,
  args: { painting: false, drawingIndex: 0 },
  decorators: [
    (Story) => (
      <div style={{ width: 140, height: 100, background: '#6C5AAE', padding: 10 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BrushPainting>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Painting: Story = { args: { painting: true } }
