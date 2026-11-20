import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, within } from 'storybook/test'
import MasonryGrid from '.'

const meta = {
  title: 'Molecules/MasonryGrid',
  component: MasonryGrid,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof MasonryGrid>
export default meta
type Story = StoryObj<typeof meta>

export const MixedHeights: Story = {
  args: {
    children: [180, 300, 220, 260, 160, 240].map((height, index) => (
      <div
        key={index}
        className="flex items-center justify-center rounded-2xl bg-[#251B3D] text-[#FBF9FF]"
        style={{ height }}
      >
        Sample {index + 1}
      </div>
    )),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('list')).toBeVisible()
    await expect(canvas.getAllByRole('listitem')).toHaveLength(6)
  },
}

export const Empty: Story = { args: { children: null } }
