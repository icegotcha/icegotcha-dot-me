import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import ExpertiseSection from '.'

const meta = {
  title: 'Organisms/ExpertiseSection',
  component: ExpertiseSection,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ExpertiseSection>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Mobile: Story = { parameters: { viewport: { value: 'mobile1' } } }
