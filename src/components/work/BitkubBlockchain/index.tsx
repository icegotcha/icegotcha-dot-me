import type { ReactElement } from 'react'
import { ArrowDown } from 'lucide-react'
import BrowserPreviewFrame from '@/components/molecules/BrowserPreviewFrame'
import WebsiteMockup from './WebsiteMockup'

export default function BitkubBlockchainPreview(): ReactElement {
  return (
    <BrowserPreviewFrame
      title="Page load preview"
      caption={
        <>
          <span className="mb-2 flex items-center gap-2 text-[#FBF9FF]">
            <ArrowDown size={16} aria-hidden="true" />
            Scroll inside the preview to explore the page.
          </span>
          Unbranded motion study of floating objects, staggered entrances, and scroll reveals.{' '}
          Counter values are illustrative.
        </>
      }
    >
      <WebsiteMockup />
    </BrowserPreviewFrame>
  )
}
