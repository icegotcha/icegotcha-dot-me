import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import HeroBrush from '.'

const meta = {
  title: 'Atoms/HeroBrush',
  component: HeroBrush,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 140, height: 100, background: '#6C5AAE', padding: 10 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HeroBrush>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Painting: Story = { args: { paintKey: 1 } }
