'use client'

import * as Dialog from '@radix-ui/react-dialog'
import Link from 'next/link'
import type { ReactElement } from 'react'
import { PIXEL, MONO } from '@/lib/fonts'
import { STORY_INTRODUCTION } from '@/content/story'

/** Radix owns focus trapping, Escape, outside dismissal, and trigger focus restoration. */
export default function StoryPreviewDialog(): ReactElement {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-[#100E20]/55" />
      <Dialog.Content
        className="story-preview fixed left-1/2 top-1/2 z-50 w-[calc(100%-3rem)] max-w-[480px] -translate-x-1/2 -translate-y-1/2 text-[#44325F]"
        style={{ ...MONO, perspective: '1200px' }}
      >
        <div className="story-preview-page relative max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain rounded-l-sm rounded-r-xl border border-[#B9A8E6]/50 bg-[#FBF3E4] p-6 shadow-[0_12px_32px_rgba(16,14,32,0.4)] sm:p-8">
          <span aria-hidden="true" className="absolute right-4 top-14 text-[#B9A8E6]">
            ✦
          </span>
          <span aria-hidden="true" className="absolute bottom-4 left-5 text-xs text-[#B9A8E6]">
            ✧
          </span>
          <span aria-hidden="true" className="absolute bottom-6 right-6 text-[#FFD03A]">
            ✦
          </span>
          <Dialog.Title className="text-2xl leading-tight text-[#251B3D]" style={PIXEL}>
            {STORY_INTRODUCTION.title}
          </Dialog.Title>
          <Dialog.Description className="mt-4 whitespace-pre-line text-base leading-relaxed">
            {STORY_INTRODUCTION.description}
          </Dialog.Description>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Dialog.Close asChild>
              <Link
                href="/story"
                className="inline-flex min-h-11 items-center rounded-lg bg-[#6C5AAE] px-4 text-sm text-[#F7EFE2] hover:bg-[#251B3D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C5AAE]"
              >
                Read My Story →
              </Link>
            </Dialog.Close>
            <Dialog.Close className="inline-flex min-h-11 items-center rounded-lg border border-[#6C5AAE]/50 px-4 text-sm text-[#44325F] hover:bg-[#B9A8E6]/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C5AAE]">
              Close
            </Dialog.Close>
          </div>
        </div>
        <style>{`
          .story-preview-page {
            transform-origin: left center;
            animation: story-page-open 420ms cubic-bezier(0.16,1,0.3,1);
          }
          @keyframes story-page-open {
            from { opacity: 0; transform: rotateY(-35deg) scale(0.96); }
            to { opacity: 1; transform: rotateY(0) scale(1); }
          }
          @media (prefers-reduced-motion: reduce) { .story-preview-page { animation: none; } }
        `}</style>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
