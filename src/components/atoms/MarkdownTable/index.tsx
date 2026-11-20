import type { ReactElement, ReactNode } from 'react'

interface MarkdownTableProps {
  children?: ReactNode
}

export default function MarkdownTable({ children }: MarkdownTableProps): ReactElement {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-left text-sm">{children}</table>
    </div>
  )
}
