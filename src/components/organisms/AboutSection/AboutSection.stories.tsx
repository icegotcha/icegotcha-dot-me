import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import AboutSection from '.'

const meta = {
  title: 'Organisms/AboutSection',
  component: AboutSection,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AboutSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
