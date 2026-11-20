import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import SectionHeader from '.'

const meta = {
  title: 'Atoms/SectionHeader',
  component: SectionHeader,
  args: { label: 'about me' },
  argTypes: { label: { control: 'text' } },
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SectionHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
