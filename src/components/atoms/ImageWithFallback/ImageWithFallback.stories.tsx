import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ImageWithFallback } from '.'

const meta = {
  title: 'Atoms/ImageWithFallback',
  component: ImageWithFallback,
  parameters: { layout: 'centered' },
  args: {
    alt: 'Example image',
    className: 'w-48 h-48 rounded-xl object-cover',
  },
} satisfies Meta<typeof ImageWithFallback>

export default meta
type Story = StoryObj<typeof meta>

/** A valid source renders the image normally. */
export const Loaded: Story = {
  args: {
    src: 'https://picsum.photos/seed/icegotcha/300/300',
  },
}

/** A broken source swaps in the built-in placeholder graphic. */
export const FallbackOnError: Story = {
  args: {
    src: 'https://invalid.invalid/does-not-exist.png',
  },
}
