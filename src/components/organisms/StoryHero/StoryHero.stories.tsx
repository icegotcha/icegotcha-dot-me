import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import StoryHero from '.'

const meta = {
  title: 'Organisms/StoryHero',
  component: StoryHero,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof StoryHero>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
