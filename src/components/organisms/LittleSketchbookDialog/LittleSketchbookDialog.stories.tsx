import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import * as Dialog from '@radix-ui/react-dialog'
import LittleSketchbookDialog from '.'
const meta = {
  title: 'Organisms/LittleSketchbookDialog',
  component: LittleSketchbookDialog,
  decorators: [
    (Story) => (
      <Dialog.Root defaultOpen>
        <Dialog.Trigger>Open sketchbook</Dialog.Trigger>
        <Story />
      </Dialog.Root>
    ),
  ],
} satisfies Meta<typeof LittleSketchbookDialog>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
