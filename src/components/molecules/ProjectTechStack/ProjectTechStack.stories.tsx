import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import ProjectTechStack from '.'
const meta = {
  title: 'Molecules/ProjectTechStack',
  component: ProjectTechStack,
  args: {
    groups: [
      { heading: 'Synthetic frontend fixture', technologies: ['React', 'TypeScript'] },
      { heading: 'Synthetic tools fixture', technologies: ['Git'] },
    ],
  },
} satisfies Meta<typeof ProjectTechStack>
export default meta
type Story = StoryObj<typeof meta>
export const Grouped: Story = {}
export const Empty: Story = { args: { groups: [{ heading: 'Empty', technologies: [] }] } }
