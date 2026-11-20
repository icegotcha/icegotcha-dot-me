import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import HeroMouse from '.'

const meta = {
  title: 'Atoms/HeroMouse',
  component: HeroMouse,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 70, height: 90, background: '#6C5AAE', padding: 10 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HeroMouse>

export default meta
type Story = StoryObj<typeof meta>

/** Hover to see it move a few px and tilt slightly. */
export const Default: Story = {}
