'use client'

import { useEffect, useRef, type ReactElement } from 'react'
import { useReducedMotion } from 'motion/react'
import { useHeroActivity } from '@/lib/heroParallax'
import { DOODLE_STROKES, subscribeDoodleFrame } from '@/lib/heroDoodle'

interface ScaledPoint {
  x: number
  y: number
}

interface DoodleGeometry {
  strokes: ScaledPoint[][]
  totalLength: number
}
function createDoodleGeometry(width: number, height: number): DoodleGeometry {
  const strokes = DOODLE_STROKES.map((stroke) =>
    stroke.map(([x, y]) => ({ x: x * width, y: y * height }))
  )
  const totalLength = strokes.reduce(
    (total, stroke) =>
      total +
      stroke.slice(1).reduce((length, point, index) => {
        const previous = stroke[index]
        return length + Math.hypot(point.x - previous.x, point.y - previous.y)
      }, 0),
    0
  )

  return { strokes, totalLength }
}

function drawDoodle(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  geometry: DoodleGeometry,
  progress: number
): void {
  context.setTransform(1, 0, 0, 1, 0, 0)
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
  const scale = context.canvas.width / width
  context.setTransform(scale, 0, 0, scale, 0, 0)
  context.strokeStyle = '#56418D'
  context.lineCap = 'round'
  context.lineJoin = 'round'
  context.lineWidth = Math.max(1.5, Math.min(width, height) * 0.025)

  let remaining = geometry.totalLength * progress
  geometry.strokes.forEach((stroke) => {
    if (remaining <= 0) return
    context.beginPath()
    context.moveTo(stroke[0].x, stroke[0].y)
    for (let index = 1; index < stroke.length; index += 1) {
      const previous = stroke[index - 1]
      const point = stroke[index]
      const segmentLength = Math.hypot(point.x - previous.x, point.y - previous.y)
      if (remaining >= segmentLength) {
        context.lineTo(point.x, point.y)
        remaining -= segmentLength
        continue
      }
      const ratio = segmentLength === 0 ? 0 : remaining / segmentLength
      context.lineTo(
        previous.x + (point.x - previous.x) * ratio,
        previous.y + (point.y - previous.y) * ratio
      )
      remaining = 0
      break
    }
    context.stroke()
  })
}
export default function HeroDoodleCanvas(): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const active = useHeroActivity()
  const reducedMotion = Boolean(useReducedMotion()) || !active
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return
    let width = 1
    let height = 1
    let progress = reducedMotion ? 1 : 0
    let unsubscribe: (() => void) | undefined
    let geometry = createDoodleGeometry(width, height)

    const resize = () => {
      const density = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, canvas.clientWidth)
      height = Math.max(1, canvas.clientHeight)
      canvas.width = Math.round(width * density)
      canvas.height = Math.round(height * density)
      geometry = createDoodleGeometry(width, height)
      drawDoodle(context, width, height, geometry, progress)
    }

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    resize()
    if (!reducedMotion) {
      unsubscribe = subscribeDoodleFrame((frame) => {
        if (frame.progress === progress) return
        progress = frame.progress
        drawDoodle(context, width, height, geometry, progress)
      })
    }
    return () => {
      observer.disconnect()
      unsubscribe?.()
    }
  }, [reducedMotion])
  return <canvas ref={canvasRef} aria-hidden="true" className="block h-full w-full" />
}
