'use client'

import { useEffect, useMemo, useRef, useState, type ReactElement, type ReactNode } from 'react'
import { useInView } from 'motion/react'
import { Pause, Play, RotateCcw } from 'lucide-react'
import { PIXEL } from '@/lib/fonts'
import { WORK_PREVIEW_CONTENT } from '@/content/work-preview'
import { BrowserPreviewFrameContext } from './context'
import styles from './BrowserPreviewFrame.module.css'

export { useBrowserPreviewFrame } from './context'

interface BrowserPreviewFrameProps {
  title: string
  children: ReactNode
  caption?: ReactNode
  address?: string
  viewportLabel?: string
}

export default function BrowserPreviewFrame({
  title,
  children,
  caption,
  address = 'Website preview',
  viewportLabel = WORK_PREVIEW_CONTENT.viewportLabel,
}: BrowserPreviewFrameProps): ReactElement {
  const previewRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const inView = useInView(previewRef, { amount: 0.25 })
  const [replay, setReplay] = useState(0)
  const [visible, setVisible] = useState(true)
  const [paused, setPaused] = useState(false)
  const active = inView && visible && !paused
  const context = useMemo(() => ({ active, viewportRef }), [active])

  useEffect(() => {
    function updateVisibility(): void {
      setVisible(!document.hidden)
    }
    updateVisibility()
    document.addEventListener('visibilitychange', updateVisibility)
    return () => document.removeEventListener('visibilitychange', updateVisibility)
  }, [])

  return (
    <section aria-label={title} className="pb-10 md:pb-14">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-3xl text-[#FBF9FF] md:text-4xl" style={PIXEL}>
          {title}
        </h2>
        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            aria-pressed={paused}
            onClick={() => setPaused((current) => !current)}
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {paused ? (
              <Play size={16} aria-hidden="true" />
            ) : (
              <Pause size={16} aria-hidden="true" />
            )}
            {paused ? 'Resume animation' : 'Pause animation'}
          </button>
          <button
            type="button"
            onClick={() => {
              setReplay((current) => current + 1)
              setPaused(false)
            }}
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <RotateCcw size={16} aria-hidden="true" />
            Replay animation
          </button>
        </div>
      </div>
      <figure>
        <div ref={previewRef} className={styles.browser} data-active={active}>
          <div className={styles.toolbar} aria-hidden="true">
            <div className={styles.dots}>
              <i />
              <i />
              <i />
            </div>
            <span className={styles.address}>{address}</span>
            <span className={styles.toolbarEnd} />
          </div>
          <BrowserPreviewFrameContext value={context}>
            <div key={replay} className={styles.stage}>
              <div className={styles.progress} aria-hidden="true" />
              <div className={styles.loader} aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div
                ref={viewportRef}
                className={styles.viewport}
                role="region"
                aria-label={viewportLabel}
                tabIndex={0}
              >
                {children}
              </div>
            </div>
          </BrowserPreviewFrameContext>
        </div>
        {caption && (
          <figcaption className="mt-3 max-w-[70ch] text-sm leading-relaxed text-[#C7BBD9]">
            {caption}
          </figcaption>
        )}
      </figure>
    </section>
  )
}
