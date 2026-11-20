import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import HeroRabbit from '.'
import { expect, fireEvent, within } from 'storybook/test'

const meta = {
  title: 'Atoms/HeroRabbit',
  component: HeroRabbit,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 160, height: 140, background: '#6C5AAE', padding: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HeroRabbit>

export default meta
type Story = StoryObj<typeof meta>

/** Hover to perk the ears, click/tap for a quick flick; otherwise they idle with a slow, asymmetric wiggle. */
export const Default: Story = {}

export const HoverCooldown: Story = {
  play: async ({ canvasElement }) => {
    const rabbit = within(canvasElement).getByRole('button', { name: 'Play with the rabbit' })
    await fireEvent.pointerOver(rabbit, { pointerType: 'mouse' })
    await expect(rabbit).toHaveAttribute('data-ear-reaction', 'hover')
    await new Promise((resolve) => setTimeout(resolve, 450))
    await fireEvent.pointerOut(rabbit)
    await fireEvent.pointerOver(rabbit, { pointerType: 'mouse' })
    await expect(rabbit).toHaveAttribute('data-ear-reaction', 'idle')
    await fireEvent.click(rabbit)
    await expect(rabbit).toHaveAttribute('data-ear-reaction', 'flick')
  },
}
