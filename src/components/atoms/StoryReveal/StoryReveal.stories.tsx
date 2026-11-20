import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import StoryReveal from '.'

const meta = {
  title: 'Atoms/StoryReveal',
  component: StoryReveal,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof StoryReveal>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { args: { children: 'A little story, revealed as you read.' } }
