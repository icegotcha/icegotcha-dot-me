'use client'

import { createContext, use, type RefObject } from 'react'

interface BrowserPreviewFrameContextValue {
  active: boolean
  viewportRef: RefObject<HTMLDivElement | null>
}

export const BrowserPreviewFrameContext = createContext<BrowserPreviewFrameContextValue | null>(
  null
)

export function useBrowserPreviewFrame(): BrowserPreviewFrameContextValue {
  const context = use(BrowserPreviewFrameContext)
  if (!context) throw new Error('Website mockups must be rendered inside BrowserPreviewFrame.')
  return context
}
