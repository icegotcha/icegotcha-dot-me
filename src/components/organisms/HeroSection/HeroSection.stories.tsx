import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import HeroSection from '.'

const meta = {
  title: 'Organisms/HeroSection',
  component: HeroSection,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof HeroSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
