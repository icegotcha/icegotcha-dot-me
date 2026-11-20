import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import MarkdownImage from '.'

const meta = {
  title: 'Atoms/MarkdownImage',
  component: MarkdownImage,
  args: {
    src: '/images/portfolio/aaron-burden-y02jEX_B0O0-unsplash.webp',
    alt: 'Synthetic illustration',
  },
} satisfies Meta<typeof MarkdownImage>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
