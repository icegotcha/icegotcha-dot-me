import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import HeroPalette from '.'

const meta = {
  title: 'Atoms/HeroPalette',
  component: HeroPalette,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 110, height: 90, background: '#6C5AAE', padding: 10 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HeroPalette>

export default meta
type Story = StoryObj<typeof meta>

/** Hover to see it rotate and lift; no continuous spin. */
export const Default: Story = {}
