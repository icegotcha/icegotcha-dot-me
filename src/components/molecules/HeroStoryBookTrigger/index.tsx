'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useId, type ReactElement } from 'react'
import HeroNotebook from '@/components/atoms/HeroNotebook'
import HeroObjectTooltip from '@/components/atoms/HeroObjectTooltip'
import StoryPreviewDialog from '@/components/organisms/StoryPreviewDialog'

const LETTERS = [
  { char: 'A', left: '18%', delay: '0s' },
  { char: '✦', left: '42%', delay: '0.5s' },
  { char: 'S', left: '64%', delay: '1s' },
  { char: '✧', left: '82%', delay: '1.5s' },
]

/** The floating book opens a story preview; the desk sketchbook is a separate trigger. */
export default function HeroStoryBookTrigger(): ReactElement {
  const tooltipId = useId()
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open My Story preview"
          aria-describedby={tooltipId}
          className="story-book-trigger group relative block min-h-11 w-full min-w-11 cursor-pointer border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD03A]"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-[5%] rounded-full opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
            style={{
              background:
                'radial-gradient(circle, rgba(255,208,58,0.45), rgba(185,168,230,0.3) 60%, transparent 75%)',
            }}
          />
          <HeroNotebook />
          <span aria-hidden="true" className="pointer-events-none absolute inset-0">
            {LETTERS.map(({ char, left, delay }) => (
              <span
                key={char}
                className="story-book-letter absolute top-[20%] text-sm text-[#FFD03A] opacity-0"
                style={{ left, animationDelay: delay }}
              >
                {char}
              </span>
            ))}
          </span>
          <HeroObjectTooltip id={tooltipId} placement="below">
            Discover My Story
          </HeroObjectTooltip>
          <style>{`
            @keyframes story-book-letter-rise {
              0% { transform: translateY(0); opacity: 0; }
              25% { opacity: 0.95; }
              100% { transform: translateY(-34px); opacity: 0; }
            }
            .story-book-trigger:hover .story-book-letter,
            .story-book-trigger:focus-visible .story-book-letter {
              animation: story-book-letter-rise 2.2s ease-out infinite;
            }
            @media (prefers-reduced-motion: reduce) {
              .story-book-trigger:hover .story-book-letter,
              .story-book-trigger:focus-visible .story-book-letter {
                animation: none;
                opacity: 0.8;
              }
            }
          `}</style>
        </button>
      </Dialog.Trigger>
      <StoryPreviewDialog />
    </Dialog.Root>
  )
}
