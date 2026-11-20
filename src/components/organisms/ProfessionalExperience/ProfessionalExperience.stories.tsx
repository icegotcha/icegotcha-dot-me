import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import ProfessionalExperience from '.'
const meta = {
  title: 'Organisms/ProfessionalExperience',
  component: ProfessionalExperience,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ProfessionalExperience>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
