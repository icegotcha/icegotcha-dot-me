import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import HeroCoffeeCup from '.'

const meta = {
  title: 'Atoms/HeroCoffeeCup',
  component: HeroCoffeeCup,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 100, height: 110, background: '#6C5AAE', padding: 8 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HeroCoffeeCup>

export default meta
type Story = StoryObj<typeof meta>

/** Hover to lift the cup slightly; steam rises continuously with staggered timing. */
export const Default: Story = {}
