import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import StoryClosing from '.'

const meta = {
  title: 'Organisms/StoryClosing',
  component: StoryClosing,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof StoryClosing>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
