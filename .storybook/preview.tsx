import type { Preview } from '@storybook/nextjs-vite'

import '../src/styles/index.css'
import './fonts.css'

const SITE_GRADIENT = 'var(--page-background)'

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: '100vh',
          background: SITE_GRADIENT,
          color: 'white',
          fontFamily: 'var(--font-share-tech)',
        }}
      >
        <Story />
      </div>
    ),
  ],
}

export default preview
