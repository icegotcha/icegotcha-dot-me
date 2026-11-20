import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import WritingSection from '.'

const meta = {
  title: 'Organisms/WritingSection',
  component: WritingSection,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof WritingSection>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Mobile: Story = { parameters: { viewport: { value: 'mobile1' } } }
