import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { TECH_SKILLS } from '@/content/home'
import TechStack from '.'

const meta = {
  title: 'Molecules/TechStack',
  component: TechStack,
  parameters: { layout: 'centered' },
  args: { skills: TECH_SKILLS },
} satisfies Meta<typeof TechStack>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
