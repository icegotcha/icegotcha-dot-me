import type { ReactElement } from 'react'
import { Image as ImageIcon } from 'lucide-react'
import { HERO_BROWSER_CONTENT } from '@/content/home'
import { MONO } from '@/lib/fonts'

export default function BrowserScreenOverlay(): ReactElement {
  return (
    <div
      role="img"
      aria-label={HERO_BROWSER_CONTENT.label}
      className="pointer-events-none absolute left-[10%] top-[8%] h-[58%] w-[80%] overflow-hidden rounded-[4%] bg-[#191329] text-[#FBF9FF]"
      style={{ containerType: 'inline-size' }}
    >
      <div aria-hidden="true" className="flex h-full flex-col">
        <div className="flex items-center gap-[2%] border-b border-[#C4A9DC]/20 bg-[#302448] px-[4%] py-[2%]">
          <div className="flex gap-[1cqw]">
            <span className="size-[1.5cqw] rounded-full bg-[#F3BFCF]" />
            <span className="size-[1.5cqw] rounded-full bg-[#FFD03A]" />
            <span className="size-[1.5cqw] rounded-full bg-[#C4A9DC]" />
          </div>
          <span
            className="mx-[3%] flex-1 rounded-[0.8cqw] bg-[#191329] px-[3%] py-[1%] text-[2.5cqw] leading-tight text-[#DCD3F2]"
            style={MONO}
          >
            {HERO_BROWSER_CONTENT.address}
          </span>
        </div>
        <div className="min-h-0 flex-1 bg-[#FBF9FF] px-[6%] py-[3%]">
          <div className="mb-[2cqw] flex items-center justify-between">
            <div className="h-[2cqw] w-[15%] rounded-sm bg-[#6C5AAE]" />
            <div className="flex w-[34%] gap-[2cqw]">
              {[0, 1, 2].map((item) => (
                <span key={item} className="h-[1cqw] flex-1 rounded-sm bg-[#B8A8CC]" />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-[1.1fr_1fr] items-center gap-[6%]">
            <div>
              <div className="mb-[1.5cqw] h-[3cqw] w-full rounded-sm bg-[#44325F]" />
              <div className="mb-[2cqw] h-[3cqw] w-[70%] rounded-sm bg-[#44325F]" />
              <div className="mb-[1cqw] h-[1cqw] w-full rounded-sm bg-[#B8A8CC]" />
              <div className="mb-[2cqw] h-[1cqw] w-[85%] rounded-sm bg-[#B8A8CC]" />
              <div className="h-[4cqw] w-[37%] rounded-[0.8cqw] bg-[#FFD03A]" />
            </div>
            <div className="flex h-[17cqw] items-center justify-center rounded-[1.5cqw] bg-[#DCD3F2]">
              <ImageIcon className="size-[7cqw] text-[#6C5AAE]" strokeWidth={1.5} />
            </div>
          </div>
          <div className="mt-[2cqw] grid grid-cols-3 gap-[4%]">
            {[0, 1, 2].map((item) => (
              <div key={item}>
                <div className="mb-[1cqw] h-[4cqw] rounded-[0.8cqw] bg-[#E9E1F3]" />
                <div className="h-[1cqw] w-[75%] rounded-sm bg-[#B8A8CC]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
