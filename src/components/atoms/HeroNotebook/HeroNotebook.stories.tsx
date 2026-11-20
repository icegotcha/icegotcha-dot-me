import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import HeroNotebook from '.'

const meta = {
  title: 'Atoms/HeroNotebook',
  component: HeroNotebook,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 170, height: 115, background: '#6C5AAE', padding: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HeroNotebook>

export default meta
type Story = StoryObj<typeof meta>

/** The notebook gently floats while shooting stars pass; hover adds a small tilt. */
export const Default: Story = {}
