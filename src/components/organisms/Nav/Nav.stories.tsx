import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import Nav from '.'

const meta = {
  title: 'Organisms/Nav',
  component: Nav,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Nav>

export default meta
type Story = StoryObj<typeof meta>

/** The fixed top navigation. It becomes opaque after scrolling; resize to the
 * mobile viewport to see the collapsible menu. */
export const Default: Story = {}

export const StoryPage: Story = {
  parameters: { nextjs: { appDirectory: true, navigation: { pathname: '/story' } } },
}

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile1', isRotated: false } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const toggle = canvas.getByRole('button', { name: 'Open navigation menu' })
    const previousOverflow = document.body.style.overflow

    toggle.focus()
    await userEvent.keyboard('{Enter}')
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    const close = canvas.getByRole('button', { name: 'Close navigation menu' })
    await expect(close).toHaveFocus()
    await expect(canvas.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible()
    await expect(document.body.style.overflow).toBe('hidden')

    await userEvent.keyboard(' ')
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await waitFor(() =>
      expect(
        canvas.queryByRole('navigation', { name: 'Mobile navigation' })
      ).not.toBeInTheDocument()
    )
    await expect(toggle).toHaveFocus()
    await expect(document.body.style.overflow).toBe(previousOverflow)

    await userEvent.click(toggle)
    const menu = canvas.getByRole('navigation', { name: 'Mobile navigation' })
    await userEvent.click(menu)
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')

    await userEvent.click(canvasElement)
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await waitFor(() => expect(canvasElement.querySelector('#mobile-navigation')).toBeNull())

    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await userEvent.keyboard('{Enter}')
    await expect(canvas.getByRole('button', { name: 'Close navigation menu' })).toHaveFocus()
    await userEvent.keyboard('{Escape}')
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(toggle).toHaveFocus()
  },
}
