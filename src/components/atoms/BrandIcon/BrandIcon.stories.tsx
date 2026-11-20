import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { siReact } from 'simple-icons'
import BrandIcon from '.'

const meta = {
  title: 'Atoms/BrandIcon',
  component: BrandIcon,
  parameters: { layout: 'centered' },
  args: { path: siReact.path, label: 'React' },
} satisfies Meta<typeof BrandIcon>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
