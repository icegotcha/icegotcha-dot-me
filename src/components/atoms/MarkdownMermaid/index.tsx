'use client'

import { useEffect, useId, useState, type ReactElement } from 'react'
import type { Mermaid } from 'mermaid'
import { MONO } from '@/lib/fonts'

interface MarkdownMermaidProps {
  chart: string
}

// One initialization per browser module; Mermaid serializes concurrent render calls.
async function loadMermaid(): Promise<Mermaid> {
  const { default: mermaid } = await import('mermaid')
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    suppressErrorRendering: true,
    theme: 'dark',
    fontFamily: 'var(--font-share-tech), monospace',
  })
  return mermaid
}

let mermaidPromise: ReturnType<typeof loadMermaid> | undefined

export default function MarkdownMermaid({ chart }: MarkdownMermaidProps): ReactElement {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const [result, setResult] = useState<{ chart: string; svg: string } | null>(null)
  const [failedChart, setFailedChart] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function renderChart(): Promise<void> {
      try {
        mermaidPromise ??= loadMermaid().catch((error: unknown) => {
          mermaidPromise = undefined
          throw error
        })
        const mermaid = await mermaidPromise
        if (cancelled) return
        const { svg } = await mermaid.render(`mermaid-${id}`, chart)
        if (!cancelled) setResult({ chart, svg })
      } catch {
        if (!cancelled) setFailedChart(chart)
      }
    }

    void renderChart()
    return () => {
      cancelled = true
    }
  }, [chart, id])

  if (result?.chart === chart) {
    return (
      <div
        style={MONO}
        role="img"
        aria-label="Mermaid diagram"
        className="overflow-x-auto rounded-lg bg-black/20 p-4 [&_svg]:mx-auto"
        dangerouslySetInnerHTML={{ __html: result.svg }}
      />
    )
  }

  return (
    <div>
      {failedChart === chart && (
        <p role="status" className="text-sm text-[#FFD37C]">
          Unable to render diagram. Mermaid source is shown below.
        </p>
      )}
      <pre style={MONO} aria-label="Mermaid source">
        <code>{chart}</code>
      </pre>
    </div>
  )
}
