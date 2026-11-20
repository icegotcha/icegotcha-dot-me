import type { ReactElement, ReactNode } from 'react'
import type { ExtraProps } from 'react-markdown'
import { PIXEL } from '@/lib/fonts'

type MarkdownHeadingProps = { children?: ReactNode } & ExtraProps

export default function MarkdownHeading({ children, node }: MarkdownHeadingProps): ReactElement {
  // The project title owns h1; Markdown headings begin one level below it.
  const headings = {
    h1: 'h2',
    h2: 'h3',
    h3: 'h4',
    h4: 'h5',
    h5: 'h6',
    h6: 'h6',
  } as const
  const sourceTag = node?.tagName ?? 'h1'
  const Tag =
    sourceTag === 'h1' ||
    sourceTag === 'h2' ||
    sourceTag === 'h3' ||
    sourceTag === 'h4' ||
    sourceTag === 'h5' ||
    sourceTag === 'h6'
      ? headings[sourceTag]
      : 'h2'

  return (
    <Tag className="leading-tight text-[#FBF9FF]" style={PIXEL}>
      {children}
    </Tag>
  )
}
