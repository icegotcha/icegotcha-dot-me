import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, waitFor, within } from 'storybook/test'
import ProjectMarkdown from '.'

const meta = {
  title: 'Molecules/ProjectMarkdown',
  component: ProjectMarkdown,
  args: {
    content:
      '# Synthetic heading\n\nA **Markdown** fixture.\n\n| Column |\n| --- |\n| Synthetic cell |',
  },
} satisfies Meta<typeof ProjectMarkdown>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}

export const Mermaid: Story = {
  args: {
    content: [
      '# Synthetic diagrams',
      '```mermaid',
      'flowchart LR',
      '  A[Draft] --> B[Review] --> C[Publish]',
      '```',
      '```mermaid',
      'sequenceDiagram',
      '  Reader->>Site: Open project',
      '  Site-->>Reader: Show details',
      '```',
      '```ts',
      'const ordinaryCode = true',
      '```',
      'Inline `mermaid` remains code.',
    ].join('\n\n'),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await waitFor(
      () => expect(canvas.getAllByRole('img', { name: 'Mermaid diagram' })).toHaveLength(2),
      { timeout: 30000 }
    )
    expect(canvas.getByText('const ordinaryCode = true')).toBeVisible()
    expect(canvas.getByText('mermaid', { selector: 'code' })).toBeVisible()
    expect(canvasElement.querySelectorAll('pre svg')).toHaveLength(0)
  },
}

export const InvalidMermaid: Story = {
  args: { content: '```mermaid\nthis is not a diagram\n```' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(await canvas.findByRole('status', {}, { timeout: 30000 })).toHaveTextContent(
      'Unable to render diagram'
    )
    expect(canvas.getByText('this is not a diagram')).toBeVisible()
    expect(canvas.queryByRole('img')).not.toBeInTheDocument()
  },
}
