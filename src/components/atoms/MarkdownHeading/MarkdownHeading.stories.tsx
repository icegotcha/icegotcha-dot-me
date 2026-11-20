import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import MarkdownHeading from '.'

const meta = {
  title: 'Atoms/MarkdownHeading',
  component: MarkdownHeading,
  args: { children: 'Synthetic heading' },
} satisfies Meta<typeof MarkdownHeading>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
