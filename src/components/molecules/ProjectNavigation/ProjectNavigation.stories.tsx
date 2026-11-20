import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { WORKS } from '@/content/works'
import ProjectNavigation from '.'
const meta = {
  title: 'Molecules/ProjectNavigation',
  component: ProjectNavigation,
  args: { previous: WORKS[0], next: WORKS[2] },
} satisfies Meta<typeof ProjectNavigation>
export default meta
type Story = StoryObj<typeof meta>
export const Both: Story = {}
export const First: Story = { args: { previous: undefined } }
export const Last: Story = { args: { next: undefined } }
