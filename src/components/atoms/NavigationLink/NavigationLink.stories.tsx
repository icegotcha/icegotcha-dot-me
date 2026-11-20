import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, within } from 'storybook/test'
import NavigationLink from '.'

const meta = {
  title: 'Atoms/NavigationLink',
  component: NavigationLink,
  args: { link: { label: 'work', href: '/#work' }, currentPath: '/', className: 'text-white' },
} satisfies Meta<typeof NavigationLink>
export default meta
type Story = StoryObj<typeof meta>
export const Homepage: Story = {
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('link', { name: 'work' })).toHaveAttribute(
      'href',
      '#work'
    )
  },
}
export const OtherRoute: Story = {
  args: { currentPath: '/story' },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('link', { name: 'work' })).toHaveAttribute(
      'href',
      '/#work'
    )
  },
}
export const CurrentPage: Story = {
  args: { link: { label: 'My Story', href: '/story' }, currentPath: '/story' },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('link', { name: 'My Story' })).toHaveAttribute(
      'aria-current',
      'page'
    )
  },
}
