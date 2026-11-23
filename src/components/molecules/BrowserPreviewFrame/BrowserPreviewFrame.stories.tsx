import { useState, type ReactElement } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import BrowserPreviewFrame, { useBrowserPreviewFrame } from '.'

function AlternateMockup(): ReactElement {
  const { active } = useBrowserPreviewFrame()
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-[1200px] p-6">
      <p role="status">{active ? 'Motion active' : 'Motion paused'}</p>
      <button type="button" onClick={() => setCount((current) => current + 1)}>
        Increment fixture
      </button>
      <output aria-label="Fixture count">{count}</output>
    </div>
  )
}

const meta = {
  title: 'Molecules/BrowserPreviewFrame',
  component: BrowserPreviewFrame,
  args: {
    title: 'Alternate mockup',
    address: 'example.com',
    viewportLabel: 'Alternate preview content',
    caption: 'Synthetic content demonstrating a different website inside the shared frame.',
    children: <AlternateMockup />,
  },
} satisfies Meta<typeof BrowserPreviewFrame>

export default meta
type Story = StoryObj<typeof meta>

export const AlternateContent: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Increment fixture' }))
    await expect(canvas.getByLabelText('Fixture count')).toHaveTextContent('1')
    await userEvent.click(canvas.getByRole('button', { name: 'Pause animation' }))
    await expect(canvas.getByText('Motion paused')).toBeInTheDocument()
    await userEvent.click(canvas.getByRole('button', { name: 'Resume animation' }))
    await waitFor(() => expect(canvas.getByText('Motion active')).toBeInTheDocument())
    const viewport = canvas.getByRole('region', { name: 'Alternate preview content' })
    viewport.scrollTop = 100
    await expect(viewport.scrollTop).toBeGreaterThan(0)
    await userEvent.click(canvas.getByRole('button', { name: 'Replay animation' }))
    await expect(canvas.getByLabelText('Fixture count')).toHaveTextContent('0')
    await expect(canvas.getByRole('region', { name: 'Alternate preview content' }).scrollTop).toBe(
      0
    )
    await expect(
      canvas.queryByRole('group', { name: 'Mockup product views' })
    ).not.toBeInTheDocument()
  },
}
