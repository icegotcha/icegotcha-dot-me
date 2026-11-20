import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as Dialog from '@radix-ui/react-dialog'
import HeroSketchbookTrigger from '.'
const meta = {
  title: 'Molecules/HeroSketchbookTrigger',
  component: HeroSketchbookTrigger,
  decorators: [
    (Story) => (
      <Dialog.Root>
        <div className="w-56">
          <Story />
        </div>
      </Dialog.Root>
    ),
  ],
} satisfies Meta<typeof HeroSketchbookTrigger>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
