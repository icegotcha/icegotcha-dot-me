import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import HeroStarfield from '.'

const meta = {
  title: 'Atoms/HeroStarfield',
  component: HeroStarfield,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: '100%', height: 400, background: '#6C5AAE' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HeroStarfield>

export default meta
type Story = StoryObj<typeof meta>

/** Each star twinkles on its own duration/delay; hover a star's padded hit zone to brighten it. */
export const Default: Story = {}
