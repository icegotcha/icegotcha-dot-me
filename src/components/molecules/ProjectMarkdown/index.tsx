import type { ReactElement } from 'react'
import ReactMarkdown, { defaultUrlTransform, type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import MarkdownHeading from '@/components/atoms/MarkdownHeading'
import MarkdownImage from '@/components/atoms/MarkdownImage'
import MarkdownTable from '@/components/atoms/MarkdownTable'
import MarkdownMermaid from '@/components/atoms/MarkdownMermaid'
import { resolveReadmeUrl, sanitizeContentUrl } from '@/lib/githubReadme'
import type { GitHubReadmeSource } from '@/types'

const MARKDOWN_COMPONENTS: Components = {
  h1: MarkdownHeading,
  h2: MarkdownHeading,
  h3: MarkdownHeading,
  h4: MarkdownHeading,
  h5: MarkdownHeading,
  h6: MarkdownHeading,
  img: MarkdownImage,
  table: MarkdownTable,
  pre: function MarkdownCodeBlock({ node, children, ...props }): ReactElement {
    const code = node?.children[0]
    if (
      code?.type === 'element' &&
      code.tagName === 'code' &&
      Array.isArray(code.properties.className) &&
      code.properties.className.includes('language-mermaid')
    ) {
      const chart = code.children
        .filter((child) => child.type === 'text')
        .map((child) => child.value)
        .join('')
      return <MarkdownMermaid chart={chart} />
    }
    return <pre {...props}>{children}</pre>
  },
}

interface ProjectMarkdownProps {
  content: string
  source?: GitHubReadmeSource
}

export default function ProjectMarkdown({ content, source }: ProjectMarkdownProps): ReactElement {
  const sourceUrl = source ? resolveReadmeUrl('#', 'link', source).replace(/#$/, '') : ''

  return (
    <div
      data-project-markdown
      className="min-w-0 w-full space-y-5 [overflow-wrap:anywhere] pb-10 leading-7 text-[#D5CCE6] md:pb-14 [&_a]:text-[#FFD37C] [&_a]:underline [&_a]:underline-offset-4 [&_blockquote]:border-l-2 [&_blockquote]:border-[#FFD37C] [&_blockquote]:pl-4 [&_blockquote]:text-[#C7BBD9] [&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-sm [&_h2]:text-2xl [&_h3]:text-xl [&_h3]:text-[#FBF9FF] [&_h4]:text-lg [&_h5]:text-base [&_h6]:text-base [&_h4]:text-[#FBF9FF] [&_hr]:border-white/20 [&_img]:max-w-full [&_img]:rounded-xl [&_li]:pl-1 [&_li]:leading-7 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:marker:text-[#FFD37C] [&_pre]:[overflow-wrap:normal] [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-black/20 [&_pre]:p-4 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_table]:border-collapse [&_table]:text-left [&_table]:text-sm [&_td]:border-b [&_td]:border-white/10 [&_td]:px-3 [&_td]:py-2 [&_th]:border-b [&_th]:border-white/20 [&_th]:px-3 [&_th]:py-2 [&_th]:text-[#FBF9FF] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:marker:text-[#FFD37C]"
    >
      <ReactMarkdown
        components={MARKDOWN_COMPONENTS}
        remarkPlugins={[remarkGfm]}
        skipHtml
        urlTransform={(value, key) => {
          const safeUrl = defaultUrlTransform(value)
          if (!source) return sanitizeContentUrl(safeUrl, key === 'src' ? 'image' : 'link')
          return resolveReadmeUrl(safeUrl, key === 'src' ? 'image' : 'link', source)
        }}
      >
        {content}
      </ReactMarkdown>
      {sourceUrl && (
        <p className="text-sm text-[#C7BBD9]">
          <em>
            Read the full documentation on{' '}
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD03A]"
            >
              GitHub<span className="sr-only"> (opens in a new tab)</span>
            </a>
            .
          </em>
        </p>
      )}
    </div>
  )
}
