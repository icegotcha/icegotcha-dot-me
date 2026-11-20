import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import SiteInteractionGuard from './index'

const meta = {
  title: 'Atoms/SiteInteractionGuard',
  component: SiteInteractionGuard,
  render: () => (
    <div>
      <SiteInteractionGuard />
      <p>Right-click is disabled outside the contact form.</p>
      <form data-contact-form>
        <label>
          Contact message
          <textarea defaultValue="Synthetic message for selection and right-click testing." />
        </label>
      </form>
    </div>
  ),
} satisfies Meta<typeof SiteInteractionGuard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
