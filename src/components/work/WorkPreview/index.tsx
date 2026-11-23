import type { ReactElement } from 'react'
import { ArrowDown } from 'lucide-react'
import BrowserPreviewFrame from '@/components/molecules/BrowserPreviewFrame'
import { WORK_PREVIEW_CONTENT } from '@/content/work-preview'
import type { WorkPreviewContent } from '@/types'

interface WorkPreviewProps {
  preview?: WorkPreviewContent
}

export default function WorkPreview({ preview }: WorkPreviewProps): ReactElement | null {
  if (!preview) return null
  const Preview = preview.component
  return (
    <BrowserPreviewFrame
      title={preview.title}
      address={preview.address}
      caption={
        WORK_PREVIEW_CONTENT.scrollHint || preview.description ? (
          <>
            {WORK_PREVIEW_CONTENT.scrollHint && (
              <span className="mb-2 flex items-center gap-2 text-[#FBF9FF]">
                <ArrowDown size={16} aria-hidden="true" />
                {WORK_PREVIEW_CONTENT.scrollHint}
              </span>
            )}
            {preview.description}
          </>
        ) : undefined
      }
    >
      <Preview />
    </BrowserPreviewFrame>
  )
}
