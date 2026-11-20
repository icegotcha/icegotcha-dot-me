import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import HeroDesk from '.'

const meta = {
  title: 'Atoms/HeroDesk',
  component: HeroDesk,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 480, height: 60, background: '#6C5AAE' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HeroDesk>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
