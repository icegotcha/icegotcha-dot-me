import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import HeroComputer from '.'

const meta = {
  title: 'Atoms/HeroComputer',
  component: HeroComputer,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 320, height: 224, background: '#6C5AAE', padding: 16 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HeroComputer>

export default meta
type Story = StoryObj<typeof meta>

/** Compact code preview types in without changing the artwork. */
export const Default: Story = {}
