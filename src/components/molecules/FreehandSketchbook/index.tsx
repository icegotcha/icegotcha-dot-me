'use client'

import * as Dialog from '@radix-ui/react-dialog'
import {
  useId,
  useRef,
  useState,
  type ReactElement,
  type PointerEvent,
  type KeyboardEvent,
} from 'react'
import { Check, Eraser, Pencil } from 'lucide-react'
import { HERO_COLORS } from '@/lib/heroTheme'

const PALETTE = [
  { name: 'Lavender', color: HERO_COLORS.violetDeep },
  { name: 'Warm Yellow', color: HERO_COLORS.yellow },
  { name: 'Soft Pink', color: HERO_COLORS.pink },
  { name: 'Sky Blue', color: HERO_COLORS.blue },
  { name: 'Mint Green', color: '#BCE5D0' },
] as const
const PAPER_WIDTH = 960
const PAPER_HEIGHT = 720
const CONTROL =
  'min-h-11 rounded-lg border border-[#6C5AAE]/40 text-[#44325F] px-3 py-2 text-sm transition-colors hover:bg-[#B9A8E6]/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6C5AAE] motion-reduce:transition-none'
type Point = { x: number; y: number }

/** A fixed-resolution transparent drawing layer preserves marks across responsive resizes.
 * Pointer samples go directly to Canvas; React only updates discrete tool/UI state.
 */
export default function FreehandSketchbook(): ReactElement {
  const [selected, setSelected] = useState<(typeof PALETTE)[number]>(PALETTE[0])
  const [eraser, setEraser] = useState(false)
  const [message, setMessage] = useState('')
  const paperCoordinatesRef = useRef<SVGSVGElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)
  const pointRef = useRef<Point>({ x: PAPER_WIDTH / 2, y: PAPER_HEIGHT / 2 })
  const activePointer = useRef<number | null>(null)
  const keyboardDrawing = useRef(false)
  const instructionsId = useId()

  function paint(from: Point, to: Point): void {
    const context = canvasRef.current?.getContext('2d')
    if (!context) return
    const size = eraser ? 36 : 12
    context.globalCompositeOperation = eraser ? 'destination-out' : 'source-over'
    context.strokeStyle = selected.color
    context.fillStyle = selected.color
    context.lineWidth = size
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.beginPath()
    if (from.x === to.x && from.y === to.y) {
      context.arc(to.x, to.y, size / 2, 0, Math.PI * 2)
      context.fill()
    } else {
      context.moveTo(from.x, from.y)
      context.lineTo(to.x, to.y)
      context.stroke()
    }
  }
  function moveCursor(point: Point): void {
    pointRef.current = point
    if (!cursorRef.current) return
    cursorRef.current.style.left = `${(point.x / PAPER_WIDTH) * 100}%`
    cursorRef.current.style.top = `${(point.y / PAPER_HEIGHT) * 100}%`
  }
  function pointerPoint(event: PointerEvent<HTMLCanvasElement>): Point {
    // SVG's screen matrix includes the paper tilt and responsive/entrance transforms.
    const matrix = paperCoordinatesRef.current?.getScreenCTM()
    if (!matrix) return pointRef.current
    const local = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse())
    return {
      x: Math.max(0, Math.min(PAPER_WIDTH, local.x)),
      y: Math.max(0, Math.min(PAPER_HEIGHT, local.y)),
    }
  }
  function startStroke(event: PointerEvent<HTMLCanvasElement>): void {
    if (event.button !== 0 || activePointer.current !== null) return
    event.preventDefault()
    event.currentTarget.focus({ preventScroll: true })
    event.currentTarget.setPointerCapture(event.pointerId)
    activePointer.current = event.pointerId
    keyboardDrawing.current = false
    const point = pointerPoint(event)
    moveCursor(point)
    paint(point, point)
  }
  function moveStroke(event: PointerEvent<HTMLCanvasElement>): void {
    if (activePointer.current !== event.pointerId) return
    const point = pointerPoint(event)
    paint(pointRef.current, point)
    moveCursor(point)
  }
  function stopStroke(event: PointerEvent<HTMLCanvasElement>): void {
    if (activePointer.current !== event.pointerId) return
    activePointer.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId)
  }
  function handleKey(event: KeyboardEvent<HTMLCanvasElement>): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      if (event.repeat) return
      if (event.key === ' ') {
        keyboardDrawing.current = !keyboardDrawing.current
        setMessage(
          keyboardDrawing.current
            ? 'Drawing on. Use arrow keys to draw.'
            : 'Drawing off. Use arrow keys to move.'
        )
      } else paint(pointRef.current, pointRef.current)
      return
    }
    const step = event.shiftKey ? 24 : 8
    const delta: Record<string, Point> = {
      ArrowLeft: { x: -step, y: 0 },
      ArrowRight: { x: step, y: 0 },
      ArrowUp: { x: 0, y: -step },
      ArrowDown: { x: 0, y: step },
    }
    const offset = delta[event.key]
    if (!offset) return
    event.preventDefault()
    const previous = pointRef.current
    const next = {
      x: Math.max(0, Math.min(PAPER_WIDTH, previous.x + offset.x)),
      y: Math.max(0, Math.min(PAPER_HEIGHT, previous.y + offset.y)),
    }
    if (keyboardDrawing.current) paint(previous, next)
    moveCursor(next)
  }

  return (
    <div className="mt-4">
      <div className="sketchbook-drawing-paper relative isolate mb-5">
        <canvas
          ref={canvasRef}
          width={PAPER_WIDTH}
          height={PAPER_HEIGHT}
          role="application"
          aria-label="Drawing paper"
          aria-describedby={instructionsId}
          tabIndex={0}
          onPointerDown={startStroke}
          onPointerMove={moveStroke}
          onPointerUp={stopStroke}
          onPointerCancel={stopStroke}
          onLostPointerCapture={() => {
            activePointer.current = null
          }}
          onKeyDown={handleKey}
          onBlur={() => {
            keyboardDrawing.current = false
          }}
          className="peer block aspect-[4/3] w-full touch-none cursor-crosshair focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#6C5AAE]"
        >
          A drawing surface. Use arrow keys to move, Space to toggle drawing, and Enter for a dot.
        </canvas>
        <svg
          ref={paperCoordinatesRef}
          aria-hidden="true"
          focusable="false"
          viewBox={`0 0 ${PAPER_WIDTH} ${PAPER_HEIGHT}`}
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
        />
        <span
          ref={cursorRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#44325F] bg-white/60 peer-focus-visible:block"
        />
      </div>
      <p id={instructionsId} className="sr-only">
        Drag to draw or color. Keyboard: arrows move, Space toggles drawing, Enter adds a dot.
      </p>
      <div role="group" aria-label="Choose a color" className="flex flex-wrap justify-center gap-2">
        {PALETTE.map((color) => (
          <button
            key={color.name}
            type="button"
            aria-label={color.name}
            aria-pressed={!eraser && selected.name === color.name}
            onClick={() => {
              setSelected(color)
              setEraser(false)
            }}
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#6C5AAE] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#44325F]"
            style={{ backgroundColor: color.color }}
          >
            {!eraser && selected.name === color.name && (
              <Check size={20} color="#44325F" aria-hidden="true" />
            )}
          </button>
        ))}
      </div>
      <p className="sr-only">{eraser ? 'Eraser selected' : `Selected: ${selected.name}`}</p>
      <div role="group" aria-label="Drawing tools" className="mt-3 flex gap-2">
        <button
          type="button"
          aria-pressed={!eraser}
          onClick={() => setEraser(false)}
          className={`${CONTROL} inline-flex flex-1 items-center justify-center gap-2 aria-pressed:bg-[#DCD3F2] aria-pressed:text-[#44325F]`}
        >
          <Pencil size={16} aria-hidden="true" />
          Brush
        </button>
        <button
          type="button"
          aria-pressed={eraser}
          onClick={() => setEraser(true)}
          className={`${CONTROL} inline-flex flex-1 items-center justify-center gap-2 aria-pressed:bg-[#DCD3F2] aria-pressed:text-[#44325F]`}
        >
          <Eraser size={16} aria-hidden="true" />
          Eraser
        </button>
      </div>
      <Dialog.Close asChild>
        <a
          href="#work"
          className="mt-2 flex min-h-11 items-center justify-center rounded-lg text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-[#6C5AAE]"
        >
          Explore Creative Work →
        </a>
      </Dialog.Close>
      <p role="status" className="sr-only">
        {message}
      </p>
    </div>
  )
}
