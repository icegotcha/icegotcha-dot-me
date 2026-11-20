import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import HeroDrawingSheet from '.'

const meta = {
  title: 'Atoms/HeroDrawingSheet',
  component: HeroDrawingSheet,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 130, height: 110, background: '#6C5AAE', padding: 10 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HeroDrawingSheet>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
