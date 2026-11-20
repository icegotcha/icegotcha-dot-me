import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import HeroDoodleCanvas from '.'
const meta = {
  title: 'Atoms/HeroDoodleCanvas',
  component: HeroDoodleCanvas,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="h-44 w-56 -rotate-6 bg-[#FBF9EF] p-5">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HeroDoodleCanvas>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}

export const DrawingCycle: Story = {
  play: async () => {
    const { getDoodleFrame } = await import('@/lib/heroDoodle')
    const { expect } = await import('storybook/test')
    expect(getDoodleFrame(0)).toEqual({ progress: 0, tip: [0.18, 0.7] })
    const drawing = getDoodleFrame(3240)
    expect(drawing.progress).toBeCloseTo(0.5)
    expect(getDoodleFrame(1620).progress).toBeLessThan(0.25)
    expect(getDoodleFrame(4860).progress).toBeGreaterThan(0.75)
    expect(drawing.tip).not.toEqual([0.18, 0.7])
    const held = getDoodleFrame(7500)
    expect(held.progress).toBe(1)
    expect(held.tip[0]).toBeCloseTo(0.58)
    expect(held.tip[1]).toBeCloseTo(0.64)
    expect(getDoodleFrame(8700)).toEqual({ progress: 0, tip: [0.18, 0.7] })
    expect(getDoodleFrame(9000)).toEqual(getDoodleFrame(0))
    expect(getDoodleFrame(500, true)).toEqual(getDoodleFrame(7500, true))
  },
}
