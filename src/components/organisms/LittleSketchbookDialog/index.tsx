'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { lazy, Suspense, useRef, type ReactElement } from 'react'
import { X } from 'lucide-react'
import { PIXEL, MONO } from '@/lib/fonts'

const FreehandSketchbook = lazy(() => import('@/components/molecules/FreehandSketchbook'))

/** Radix owns focus trapping, Escape, outside dismissal, and trigger focus restoration. */
export default function LittleSketchbookDialog(): ReactElement {
  const titleRef = useRef<HTMLHeadingElement>(null)
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-[#100E20]/45" />
      <Dialog.Content
        className="little-sketchbook fixed left-1/2 top-1/2 z-50 isolate w-[calc(100%-3rem)] max-w-[560px] -translate-x-1/2 -translate-y-1/2 text-[#44325F]"
        style={MONO}
        onOpenAutoFocus={(event) => {
          event.preventDefault()
          titleRef.current?.focus()
        }}
      >
        <div className="sketchbook-sheet relative isolate">
          <div className="sketchbook-page relative max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain p-4 sm:p-6">
            <Dialog.Title
              ref={titleRef}
              tabIndex={-1}
              className="pr-10 text-2xl leading-tight outline-none"
              style={PIXEL}
            >
              Little Sketchbook
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              A little paper for your imagination.
            </Dialog.Description>
            <Dialog.Close
              className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-lg hover:bg-[#B9A8E6]/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C5AAE]"
              aria-label="Close sketchbook"
            >
              <X size={20} aria-hidden="true" />
            </Dialog.Close>
            <Suspense
              fallback={
                <p role="status" className="flex min-h-80 items-center justify-center">
                  Opening your sketchbook…
                </p>
              }
            >
              <FreehandSketchbook />
            </Suspense>
            <Dialog.Close
              className="mx-auto flex min-h-11 items-center justify-center gap-2 text-xs text-[#6C5AAE] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-[#6C5AAE]"
              aria-label="Close sketchbook with Esc"
            >
              <kbd className="border border-[#B9A8E6]/50 px-1.5 py-0.5" style={MONO}>
                Esc
              </kbd>
              to close
            </Dialog.Close>
          </div>
        </div>
        <style>{`
          .little-sketchbook {
            --sketchbook-paper-angle: -1.5deg;
            animation: sketchbook-open 220ms cubic-bezier(0.16,1,0.3,1);
          }
          .sketchbook-sheet {
            transform: rotate(var(--sketchbook-paper-angle));
          }
          .sketchbook-sheet::before {
            content: '';
            position: absolute;
            inset: 0;
            z-index: -1;
            pointer-events: none;
            background: #f4eddd;
            outline: 1px solid rgba(108,90,174,0.16);
            transform: translate(4px, 5px) rotate(1deg);
          }
          .sketchbook-page {
            background-color: #fffdf7;
            background-image: repeating-linear-gradient(to bottom, transparent 0, transparent 23px, rgba(108,90,174,0.16) 23px, rgba(108,90,174,0.16) 24px);
            box-shadow: 1px 6px 18px rgba(16,14,32,0.2);
          }
          @media (max-width: 639px) {
            .little-sketchbook { --sketchbook-paper-angle: -0.75deg; }
          }
          @keyframes sketchbook-open { from { opacity: 0.7; transform: translateY(6px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
          @media (prefers-reduced-motion: reduce) { .little-sketchbook { animation: none; } }
        `}</style>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
