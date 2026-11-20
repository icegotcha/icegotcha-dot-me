export type Point = readonly [number, number]

export const DOODLE_STROKES: readonly (readonly Point[])[] = [
  [
    [0.18, 0.7],
    [0.12, 0.55],
    [0.16, 0.4],
    [0.3, 0.3],
    [0.27, 0.08],
    [0.39, 0.28],
    [0.5, 0.24],
    [0.63, 0.06],
    [0.62, 0.31],
    [0.77, 0.42],
    [0.82, 0.61],
    [0.72, 0.78],
    [0.5, 0.86],
    [0.29, 0.82],
    [0.18, 0.7],
  ],
  [
    [0.36, 0.51],
    [0.37, 0.52],
  ],
  [
    [0.62, 0.49],
    [0.63, 0.5],
  ],
  [
    [0.42, 0.65],
    [0.5, 0.7],
    [0.58, 0.64],
  ],
] as const
export const CYCLE_MS = 9000
const DRAW_PORTION = 0.72
const HOLD_PORTION = 0.92

interface DoodleFrame {
  progress: number
  tip: Point
}

const SEGMENTS = DOODLE_STROKES.flatMap((stroke) =>
  stroke.slice(1).map((end, index) => {
    const start = stroke[index]
    // The doodle viewport is 8:7 inside the original notepad artwork.
    return { start, end, length: Math.hypot((end[0] - start[0]) * 8, (end[1] - start[1]) * 7) }
  })
)

const TOTAL_LENGTH = SEGMENTS.reduce((total, segment) => total + segment.length, 0)

/** Both renderers use the document clock, so mounting or resizing cannot desync the tip. */
export function getDoodleFrame(time: number, reducedMotion = false): DoodleFrame {
  const cycle = (time % CYCLE_MS) / CYCLE_MS
  let progress = 0
  if (reducedMotion || (cycle >= DRAW_PORTION && cycle < HOLD_PORTION)) progress = 1
  else if (cycle < DRAW_PORTION) {
    const drawingProgress = cycle / DRAW_PORTION
    // Ease the shared clock, rather than springing the pencil away from the ink.
    progress = drawingProgress * drawingProgress * (3 - 2 * drawingProgress)
  }

  let remaining = TOTAL_LENGTH * progress
  for (const { start, end, length } of SEGMENTS) {
    if (remaining <= length) {
      const ratio = length === 0 ? 0 : remaining / length
      return {
        progress,
        tip: [start[0] + (end[0] - start[0]) * ratio, start[1] + (end[1] - start[1]) * ratio],
      }
    }
    remaining -= length
  }
  return { progress, tip: [0.58, 0.64] }
}

// Browser-only subscribers register from effects. The last unsubscribe stops the clock.
type DoodleListener = (frame: DoodleFrame) => void
const doodleListeners = new Set<DoodleListener>()
let scheduledFrame: number | undefined

function broadcastDoodleFrame(time: number): void {
  scheduledFrame = undefined
  const frame = getDoodleFrame(time)
  doodleListeners.forEach((listener) => listener(frame))
  if (doodleListeners.size > 0 && scheduledFrame === undefined) {
    scheduledFrame = requestAnimationFrame(broadcastDoodleFrame)
  }
}

/** Share one frame calculation and RAF across ink and pencil, including standalone stories. */
export function subscribeDoodleFrame(listener: DoodleListener): () => void {
  doodleListeners.add(listener)
  listener(getDoodleFrame(performance.now()))
  if (scheduledFrame === undefined) scheduledFrame = requestAnimationFrame(broadcastDoodleFrame)
  return () => {
    doodleListeners.delete(listener)
    if (doodleListeners.size === 0 && scheduledFrame !== undefined) {
      cancelAnimationFrame(scheduledFrame)
      scheduledFrame = undefined
    }
  }
}
