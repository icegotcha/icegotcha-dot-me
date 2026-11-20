import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import HeroPlant from '.'
import { expect, userEvent, within } from 'storybook/test'

const meta = {
  title: 'Atoms/HeroPlant',
  component: HeroPlant,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 180 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HeroPlant>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ClickWobble: Story = {
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button', {
      name: 'Gently wobble the bunny planter',
    })
    const image = canvasElement.querySelector('img')
    await expect(image?.getAnimations()).toHaveLength(0)
    await userEvent.click(button)
    await expect(image?.getAnimations()).toHaveLength(1)
    await userEvent.click(button)
    await expect(image?.getAnimations()).toHaveLength(1)
    await Promise.all(image?.getAnimations().map((animation) => animation.finished) ?? [])
    await expect(image?.getAnimations()).toHaveLength(0)
    button.focus()
    await userEvent.keyboard('{Enter}')
    await expect(image?.getAnimations()).toHaveLength(1)
  },
}
