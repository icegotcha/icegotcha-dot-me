import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useRef, type ReactNode } from 'react'
import { HeroPointerProvider } from '@/lib/heroParallax'
import ParallaxLayer from '.'

function StageDecorator({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div
      ref={ref}
      className="relative flex h-[320px] w-[480px] items-center justify-center overflow-hidden rounded-2xl bg-[#6C5AAE]"
    >
      <HeroPointerProvider containerRef={ref}>{children}</HeroPointerProvider>
    </div>
  )
}

const meta = {
  title: 'Molecules/ParallaxLayer',
  component: ParallaxLayer,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <StageDecorator>{Story()}</StageDecorator>],
} satisfies Meta<typeof ParallaxLayer>

export default meta
type Story = StoryObj<typeof meta>

/** Move the pointer inside the box to see this layer drift by a few px. */
export const Default: Story = {
  args: {
    depth: 0.7,
    className: 'absolute',
    children: (
      <div className="h-16 w-16 rounded-full bg-[#F3BFCF]" aria-label="parallax test subject" />
    ),
  },
}
