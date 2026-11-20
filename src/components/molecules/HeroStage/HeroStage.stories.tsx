import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as Dialog from '@radix-ui/react-dialog'
import { useRef } from 'react'
import { HeroPointerProvider } from '@/lib/heroParallax'
import HeroStage from '.'

function StageWithProvider() {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <Dialog.Root>
      <HeroPointerProvider containerRef={ref}>
        <HeroStage
          ref={ref}
          bursts={[]}
          reducedMotion={false}
          onObjectActivate={() => undefined}
          onDismissBurst={() => undefined}
        />
      </HeroPointerProvider>
    </Dialog.Root>
  )
}

const meta = {
  title: 'Molecules/HeroStage',
  component: StageWithProvider,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--page-background)', padding: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StageWithProvider>

export default meta
type Story = StoryObj<typeof meta>

/** The full illustrated composition: move the pointer to see layered parallax, hover/click individual objects. */
export const Default: Story = {}
