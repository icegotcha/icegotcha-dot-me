import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import HeroStoryBookTrigger from '.'
import { expect, userEvent, waitFor, within } from 'storybook/test'

const meta = {
  title: 'Molecules/HeroStoryBookTrigger',
  component: HeroStoryBookTrigger,
  decorators: [
    (Story) => (
      <div className="w-56 pt-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HeroStoryBookTrigger>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}

export const MyStoryPreview: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const page = within(canvasElement.ownerDocument.body)
    const trigger = canvas.getByRole('button', { name: 'Open My Story preview' })
    await userEvent.click(trigger)
    const dialog = await page.findByRole('dialog', { name: 'The Story Behind the Code' })
    const book = within(dialog)
    await waitFor(() =>
      expect(book.getByText(/From making my first website at seven/)).toBeVisible()
    )
    await expect(book.getByText(/drawing, writing, and imagined worlds/)).toBeVisible()
    await expect(book.getByRole('link', { name: 'Read My Story →' })).toHaveAttribute(
      'href',
      '/story'
    )
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(trigger).toHaveFocus())
    await userEvent.keyboard('{Enter}')
    await waitFor(() => expect(page.getByRole('dialog')).toBeVisible())
    await userEvent.click(page.getByRole('button', { name: 'Close' }))
    await waitFor(() => expect(trigger).toHaveFocus())
  },
}
