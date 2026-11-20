import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import DisciplinesSection from '.'

const meta = {
  title: 'Organisms/DisciplinesSection',
  component: DisciplinesSection,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof DisciplinesSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
