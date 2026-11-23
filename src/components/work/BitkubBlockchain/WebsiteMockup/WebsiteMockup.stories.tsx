import { useRef, type ReactElement, type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, within } from 'storybook/test'
import { BrowserPreviewFrameContext } from '@/components/molecules/BrowserPreviewFrame/context'
import WebsiteMockup from '.'

function ContentPreview({ children }: { children: ReactNode }): ReactElement {
  const viewportRef = useRef<HTMLDivElement>(null)

  return (
    <BrowserPreviewFrameContext value={{ active: true, viewportRef }}>
      <div
        style={{
          containerType: 'inline-size',
          overflowX: 'clip',
          background: '#161616',
          color: '#d4d4d4',
        }}
      >
        {children}
      </div>
    </BrowserPreviewFrameContext>
  )
}

const meta = {
  title: 'Work/BitkubBlockchain',
  component: WebsiteMockup,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <ContentPreview>
        <Story />
      </ContentPreview>
    ),
  ],
} satisfies Meta<typeof WebsiteMockup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(
      canvas.getByRole('img', { name: /Unbranded grayscale website mockup/ })
    ).toBeInTheDocument()
    await expect(
      canvas.getByRole('group', { name: /Interactive achievements preview/ })
    ).toBeInTheDocument()
    await expect(canvas.queryByRole('button', { name: 'Replay animation' })).not.toBeInTheDocument()
    await expect(canvas.queryByText('Website preview')).not.toBeInTheDocument()
    await expect(canvasElement.ownerDocument.documentElement.scrollWidth).toBeLessThanOrEqual(
      window.innerWidth
    )
  },
}
