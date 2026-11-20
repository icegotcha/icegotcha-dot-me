import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import MarkdownTable from '.'

const meta = {
  title: 'Atoms/MarkdownTable',
  component: MarkdownTable,
  args: {
    children: (
      <tbody>
        <tr>
          <td>Synthetic cell</td>
        </tr>
      </tbody>
    ),
  },
} satisfies Meta<typeof MarkdownTable>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
