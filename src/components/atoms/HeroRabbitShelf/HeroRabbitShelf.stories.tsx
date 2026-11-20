import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import HeroRabbitShelf from '.'

const meta = {
  title: 'Atoms/HeroRabbitShelf',
  component: HeroRabbitShelf,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 220, height: 50, background: '#6C5AAE' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HeroRabbitShelf>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
