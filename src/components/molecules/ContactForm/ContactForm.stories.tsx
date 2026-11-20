import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import ContactForm from '.'

const meta = {
  title: 'Molecules/ContactForm',
  component: ContactForm,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ContactForm>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
