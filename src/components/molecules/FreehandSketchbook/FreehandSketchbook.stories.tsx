import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as Dialog from '@radix-ui/react-dialog'
import { expect, userEvent, within } from 'storybook/test'
import FreehandSketchbook from '.'

const meta = {
  title: 'Molecules/FreehandSketchbook',
  component: FreehandSketchbook,
  decorators: [
    (Story) => (
      <Dialog.Root>
        <div className="max-w-[470px] rounded-2xl bg-[#F7EFE2] p-4 text-[#44325F]">
          <Story />
        </div>
      </Dialog.Root>
    ),
  ],
} satisfies Meta<typeof FreehandSketchbook>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const DrawAndErase: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const paper = canvas.getByRole('application', { name: 'Drawing paper' })
    function ink(): number {
      if (!(paper instanceof HTMLCanvasElement)) throw new Error('Expected drawing canvas')
      return paper.getContext('2d')?.getImageData(480, 360, 1, 1).data[3] ?? 0
    }
    await expect(ink()).toBe(0)
    await userEvent.click(canvas.getByRole('button', { name: 'Soft Pink' }))
    paper.focus()
    await userEvent.keyboard('{Enter}')
    await expect(ink()).toBeGreaterThan(0)
    await userEvent.click(canvas.getByRole('button', { name: 'Eraser' }))
    paper.focus()
    await userEvent.keyboard('{Enter}')
    await expect(ink()).toBe(0)
    await userEvent.click(canvas.getByRole('button', { name: 'Sky Blue' }))
    paper.focus()
    await userEvent.keyboard(' {ArrowRight}{ArrowDown} ')
    await expect(canvas.queryByRole('slider')).not.toBeInTheDocument()
    await expect(canvas.queryByRole('button', { name: 'Done' })).not.toBeInTheDocument()
    await expect(canvas.queryByRole('button', { name: 'Clear paper' })).not.toBeInTheDocument()
    await expect(canvas.getByRole('link', { name: 'Explore Creative Work →' })).toHaveAttribute(
      'href',
      '#work'
    )
  },
}
