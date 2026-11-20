import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import HeroPencil from '.'

const meta = {
  title: 'Atoms/HeroPencil',
  component: HeroPencil,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 140, height: 100, background: '#6C5AAE', padding: 10 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HeroPencil>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
