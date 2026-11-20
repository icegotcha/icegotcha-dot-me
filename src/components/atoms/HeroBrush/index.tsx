'use client'

import { memo, type ReactElement } from 'react'
import BrushPainting from '@/components/atoms/BrushPainting'

interface HeroBrushProps {
  /** Restart the synchronized lift and drawing on each accepted activation. */
  paintKey?: number
  drawingIndex?: number
}

/** Original brush artwork lifts and follows the same geometry that reveals the ink. */
function HeroBrush({ paintKey = 0, drawingIndex = 0 }: HeroBrushProps): ReactElement {
  return <BrushPainting key={paintKey} painting={paintKey > 0} drawingIndex={drawingIndex} />
}

export default memo(HeroBrush)
