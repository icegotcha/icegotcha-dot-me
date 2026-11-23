import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, within } from 'storybook/test'
import { WORKS } from '@/content/works'
import WorkDetail from '.'
const meta = {
  title: 'Organisms/WorkDetail',
  component: WorkDetail,
  args: { work: WORKS[0], next: WORKS[1] },
} satisfies Meta<typeof WorkDetail>
export default meta
type Story = StoryObj<typeof meta>
export const ExistingData: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.queryByRole('heading', { name: 'Visual showcase' })).not.toBeInTheDocument()
    await expect(canvasElement.querySelector('#gallery')).toBeNull()
    await expect(canvas.queryByRole('heading', { name: 'Overview' })).not.toBeInTheDocument()
    await expect(canvas.getByRole('link', { name: 'Back to All Projects' })).toHaveAttribute(
      'href',
      '/#work'
    )
  },
}
export const Blog: Story = {
  args: { work: WORKS.find((work) => work.slug === 'knowlats-dev') ?? WORKS[0] },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('heading', { level: 1 })).toHaveTextContent(args.work.title)
    await expect(canvas.getByRole('link', { name: /Visit the website/ })).toHaveAttribute(
      'href',
      'http://knowlats.dev'
    )
  },
}

export const BitkubBlockchain: Story = {
  args: { work: WORKS.find((work) => work.slug === 'bitkubblockchain') ?? WORKS[0] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('heading', { name: 'Page load preview' })).toBeInTheDocument()
    await expect(
      canvas.getByRole('group', { name: /Interactive achievements preview/ })
    ).toBeInTheDocument()
  },
}
export const SoftwareFixture: Story = {
  args: {
    work: {
      ...WORKS[1],
      title: 'Synthetic software project for layout and interaction testing',
      markdownContent:
        '# Project notes\n\nA **Markdown** introduction with a [project link](https://example.com).\n\n- First fixture point\n- Second fixture point\n\n| Feature | Supported |\n| --- | --- |\n| GFM table | Yes |',
      gallery: [
        {
          src: '/images/portfolio/aaron-burden-y02jEX_B0O0-unsplash.webp',
          alt: 'Storybook concept illustration fixture',
          caption: 'Synthetic gallery fixture only.',
        },
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const image = canvas.getByRole('img', { name: WORKS[1].image.alt })
    const markdownHeading = canvas.getByRole('heading', { name: 'Project notes', level: 2 })
    await expect(canvas.getByText('Markdown', { selector: 'strong' })).toBeInTheDocument()
    await expect(canvas.getByRole('link', { name: 'project link' })).toHaveAttribute(
      'href',
      'https://example.com'
    )
    await expect(canvas.getByText('First fixture point')).toBeInTheDocument()
    await expect(canvas.getByRole('table')).toBeInTheDocument()
    await expect(canvas.getByRole('heading', { name: 'Visual showcase' })).toBeInTheDocument()
    await expect(
      image.compareDocumentPosition(markdownHeading) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()
  },
}
export const BlankMarkdown: Story = {
  args: { work: { ...WORKS[0], markdownContent: '   ', gallery: [] } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.queryByText(/Read the full documentation/)).not.toBeInTheDocument()
    await expect(canvasElement.querySelector('[data-project-markdown]')).toBeNull()
    await expect(canvas.queryByRole('heading', { name: 'Visual showcase' })).not.toBeInTheDocument()
    await expect(canvasElement.querySelector('#gallery')).toBeNull()
  },
}

export const MarkdownEdgeCases: Story = {
  args: {
    work: {
      ...WORKS[0],
      markdownContent: [
        '# Markdown chapter',
        '## Nested section',
        '### Nested detail',
        '#### Small heading',
        '##### Deep heading',
        '###### Deepest heading',
        'https://example.com/' + 'long-path-segment'.repeat(30),
        '`' + 'long_identifier_'.repeat(30) + '`',
        '```text\n' + 'wide code line '.repeat(30) + '\n```',
        '![Synthetic Markdown illustration](/images/portfolio/aaron-burden-y02jEX_B0O0-unsplash.webp)',
        '<script>alert("synthetic")</script>',
        '[Unsafe fixture](javascript:alert%281%29)',
      ].join('\n\n'),
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    for (const [name, level] of [
      ['Markdown chapter', 2],
      ['Nested section', 3],
      ['Nested detail', 4],
      ['Small heading', 5],
      ['Deep heading', 6],
      ['Deepest heading', 6],
    ] as const) {
      await expect(canvas.getByRole('heading', { name, level })).toBeInTheDocument()
    }
    const image = canvas.getByRole('img', { name: 'Synthetic Markdown illustration' })
    await expect(image).toHaveAttribute('loading', 'lazy')
    await expect(image).toHaveAttribute('src', expect.stringContaining('/images/portfolio/'))
    await expect(canvasElement.querySelector('[data-project-markdown] script')).toBeNull()
    await expect(canvas.getByText('Unsafe fixture', { selector: 'a' })).not.toHaveAttribute(
      'href',
      expect.stringMatching(/^javascript:/i)
    )
    await expect(canvasElement.ownerDocument.documentElement.scrollWidth).toBeLessThanOrEqual(
      canvasElement.ownerDocument.documentElement.clientWidth
    )
  },
}

export const GitHubReadmeFixture: Story = {
  args: {
    markdownSource: {
      repository: 'icegotcha/synthetic-project',
      ref: 'main',
      path: 'docs/README.md',
    },
    work: {
      ...WORKS[0],
      markdownContent:
        '# Synthetic README\n\n[Setup](./setup.md)\n\n[Section](#setup)\n\n[Unsafe URL](javascript:alert%281%29)',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const sourceLink = canvas.getByRole('link', { name: 'GitHub (opens in a new tab)' })
    await expect(sourceLink).toHaveAttribute(
      'href',
      'https://github.com/icegotcha/synthetic-project/blob/main/docs/README.md'
    )
    await expect(sourceLink.closest('em')).toHaveTextContent(
      'Read the full documentation on GitHub'
    )
    await expect(canvas.getByRole('link', { name: 'Setup' })).toHaveAttribute(
      'href',
      'https://github.com/icegotcha/synthetic-project/blob/main/docs/setup.md'
    )
    await expect(canvas.getByRole('link', { name: 'Section' })).toHaveAttribute(
      'href',
      'https://github.com/icegotcha/synthetic-project/blob/main/docs/README.md#setup'
    )
    await expect(canvas.getByText('Unsafe URL', { selector: 'a' })).not.toHaveAttribute(
      'href',
      expect.stringMatching(/^javascript:/i)
    )
  },
}

export const ProjectLinks: Story = {
  args: {
    work: {
      ...WORKS[0],
      links: [
        { kind: 'link', label: 'View work', href: 'https://example.com/demo' },
        { kind: 'github', label: 'GitHub', href: 'https://github.com/icegotcha/synthetic-project' },
        { label: 'Related article', href: 'https://example.com/article' },
        { label: 'Unsafe link', href: 'javascript:alert(1)' },
        { label: 'Relative link', href: '/relative' },
        { label: ' ', href: 'https://example.com/blank' },
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const navigation = canvas.getByRole('navigation', { name: 'Project links' })
    const links = within(navigation).getAllByRole('link')
    await expect(links).toHaveLength(3)
    const image = canvas.getByRole('img', { name: WORKS[0].image.alt })
    await expect(
      image.compareDocumentPosition(navigation) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()
    for (const link of links) {
      await expect(link).toHaveAttribute('target', '_blank')
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      await expect(link.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
      link.focus()
      await expect(link).toHaveFocus()
    }
  },
}

export const LocalMarkdownFallback: Story = {
  args: {
    work: {
      ...WORKS[0],
      githubReadme: { repository: 'icegotcha/synthetic-project' },
      markdownContent: '## Local project notes\n\nFallback documentation.',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('heading', { name: 'Local project notes' })).toBeInTheDocument()
    await expect(canvas.queryByText(/Read the full documentation/)).not.toBeInTheDocument()
    await expect(
      canvas.queryByRole('navigation', { name: 'Project links' })
    ).not.toBeInTheDocument()
  },
}
