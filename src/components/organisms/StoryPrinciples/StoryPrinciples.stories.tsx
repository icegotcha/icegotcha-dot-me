import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import StoryPrinciples from '.'

const meta = {
  title: 'Organisms/StoryPrinciples',
  component: StoryPrinciples,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof StoryPrinciples>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
