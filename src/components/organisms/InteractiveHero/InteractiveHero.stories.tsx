import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import InteractiveHero from '.'
import { HERO_BROWSER_CONTENT, HERO_SCREEN_IMAGE } from '@/content/home'
import { expect, userEvent, waitFor, within } from 'storybook/test'

const meta = {
  title: 'Organisms/InteractiveHero',
  component: InteractiveHero,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof InteractiveHero>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SkySwitch: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const planter = canvas.getByRole('button', { name: /Change the sky/ })
    const window = canvasElement.querySelector('[data-sky-mode]')
    await expect(window).toHaveAttribute('data-sky-mode', 'moon')
    await expect(canvas.getByText(/^Sky:/)).toHaveTextContent('Sky: moon')
    for (const sky of ['sun', 'moon']) {
      await userEvent.click(planter)
      await expect(window).toHaveAttribute('data-sky-mode', sky)
      await expect(canvas.getByText(/^Sky:/)).toHaveTextContent(`Sky: ${sky}`)
    }
    await userEvent.click(planter)
    await userEvent.click(planter)
    await userEvent.click(planter)
    await expect(window).toHaveAttribute('data-sky-mode', 'sun')
    planter.focus()
    await userEvent.keyboard('{Enter}')
    await expect(canvas.getByText(/^Sky:/)).toHaveTextContent('Sky: moon')
    await userEvent.keyboard(' ')
    await expect(canvas.getByText(/^Sky:/)).toHaveTextContent('Sky: sun')
    await expect(canvasElement.querySelectorAll('.hero-monitor-code')).toHaveLength(6)
    await expect(canvasElement.querySelector('[data-hero-spark-burst]')).not.toBeInTheDocument()
    await expect(canvas.getByText('Computer: code')).toBeInTheDocument()
    await expect(canvasElement.querySelector('[data-hero-spark-burst]')).not.toBeInTheDocument()
    const rabbit = canvas.getByRole('button', { name: 'Play with the rabbit' })
    rabbit.focus()
    await userEvent.keyboard('{Enter}')
    await expect(rabbit).toHaveAttribute('data-ear-reaction', 'flick')
    await expect(canvasElement.querySelector('[data-hero-spark-burst]')).not.toBeInTheDocument()
  },
}

export const ScreenCycle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const mouse = canvas.getByRole('button', { name: 'Show browser on the computer' })
    await expect(canvas.getByText('Computer: code')).toBeInTheDocument()
    await userEvent.click(mouse)
    await expect(canvas.getByRole('img', { name: HERO_BROWSER_CONTENT.label })).toBeVisible()
    await expect(canvas.getByText('Computer: browser')).toBeInTheDocument()
    await expect(canvas.getByText('Sky: moon')).toBeInTheDocument()
    await expect(canvasElement.querySelector('.hero-monitor-code')).not.toBeInTheDocument()
    await userEvent.click(canvas.getByRole('button', { name: /Change the sky/ }))
    await expect(canvas.getByText('Sky: sun')).toBeInTheDocument()
    await expect(canvas.getByRole('img', { name: HERO_BROWSER_CONTENT.label })).toBeVisible()
    mouse.focus()
    await userEvent.keyboard('{Enter}')
    const artwork = canvas.getByRole('img', { name: HERO_SCREEN_IMAGE.alt })
    await expect(artwork).toBeVisible()
    if (!(artwork instanceof HTMLImageElement)) throw new Error('Expected the screen artwork image')
    await waitFor(() => expect(artwork.naturalWidth).toBeGreaterThan(0))
    await expect(canvas.getByText('Computer: artwork')).toBeInTheDocument()
    await expect(
      canvas.queryByRole('img', { name: HERO_BROWSER_CONTENT.label })
    ).not.toBeInTheDocument()
    await userEvent.keyboard(' ')
    await expect(canvas.getByText('Computer: code')).toBeInTheDocument()
    await expect(canvasElement.querySelectorAll('.hero-monitor-code')).toHaveLength(6)
    await userEvent.keyboard(' ')
    await expect(canvas.getByRole('img', { name: HERO_BROWSER_CONTENT.label })).toBeVisible()
    await expect(canvas.getByText('Sky: sun')).toBeInTheDocument()
    await expect(canvasElement.querySelector('[data-hero-spark-burst]')).not.toBeInTheDocument()
  },
}

export const SketchbookKeyboard: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const page = within(canvasElement.ownerDocument.body)
    const trigger = canvas.getByRole('button', { name: 'Open Little Sketchbook' })
    trigger.focus()
    await userEvent.keyboard('{Enter}')
    const dialog = await page.findByRole('dialog', { name: 'Little Sketchbook' })
    const book = within(dialog)
    await expect(await book.findByRole('button', { name: 'Lavender' })).toBeVisible()
    for (let i = 0; i < 20; i += 1) {
      await userEvent.tab()
      await expect(dialog.contains(canvasElement.ownerDocument.activeElement)).toBe(true)
    }
    await userEvent.keyboard('{Escape}')
    await expect(page.queryByRole('dialog')).not.toBeInTheDocument()
    await expect(trigger).toHaveFocus()
    await userEvent.keyboard(' ')
    await expect(await page.findByRole('dialog', { name: 'Little Sketchbook' })).toBeVisible()
    await userEvent.click(page.getByRole('button', { name: 'Close sketchbook' }))
    await expect(trigger).toHaveFocus()
  },
}

export const PaintMagic: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const brush = canvas.getByRole('button', { name: 'Paint a little magic' })
    brush.focus()
    await userEvent.keyboard('{Enter}')
    const first = canvasElement.querySelector('[data-magic-drawing]')
    await expect(first).toBeInTheDocument()
    await expect(canvas.getByText('Sky: moon')).toBeInTheDocument()
    await userEvent.click(brush)
    await expect(canvasElement.querySelector('[data-magic-drawing]')).toBe(first)
    await waitFor(() => {
      const line = canvasElement.querySelector<SVGPathElement>('.hero-magic-line')
      expect(Number(line?.style.strokeDashoffset)).toBeLessThan(1)
    })
    // The tip and revealed stroke must occupy the same screen point each frame.
    for (let sample = 0; sample < 12; sample++) {
      await new Promise(requestAnimationFrame)
      const lines = Array.from(canvasElement.querySelectorAll<SVGPathElement>('.hero-magic-line'))
      const line = lines.find((path) => {
        const offset = Number(path.style.strokeDashoffset)
        return offset > 0 && offset < 1
      })
      const matrix = line?.getScreenCTM()
      const tip = canvasElement.querySelector('[data-hero-brush-tip]')?.getBoundingClientRect()
      if (!line || !matrix || !tip) throw new Error('Expected an active brush stroke')
      const point = line.getPointAtLength(
        line.getTotalLength() * (1 - Number(line.style.strokeDashoffset))
      )
      const screen = new DOMPoint(point.x, point.y).matrixTransform(matrix)
      await expect(Math.hypot(screen.x - tip.x, screen.y - tip.y)).toBeLessThan(1)
    }
  },
}

export const PointerBatching: Story = {
  play: async ({ canvasElement }) => {
    const stage = canvasElement.querySelector<HTMLDivElement>('.hero-stage')
    if (!stage) throw new Error('Expected the Hero stage')
    await new Promise(requestAnimationFrame)
    const original = stage.getBoundingClientRect
    const bounds = original.call(stage)
    let layoutReads = 0
    stage.getBoundingClientRect = () => {
      layoutReads += 1
      return original.call(stage)
    }
    function move(pointerType: string): void {
      for (let index = 0; index < 100; index++) {
        stage?.dispatchEvent(
          new PointerEvent('pointermove', {
            pointerType,
            clientX: bounds.x + bounds.width * 0.6,
            clientY: bounds.y + bounds.height * 0.4,
          })
        )
      }
    }
    try {
      move('mouse')
      await new Promise(requestAnimationFrame)
      await expect(layoutReads).toBe(1)
      layoutReads = 0
      move('mouse')
      stage.dispatchEvent(new PointerEvent('pointerleave'))
      await new Promise(requestAnimationFrame)
      await expect(layoutReads).toBe(0)
      move('touch')
      await new Promise(requestAnimationFrame)
      await expect(layoutReads).toBe(0)
    } finally {
      stage.getBoundingClientRect = original
      stage.dispatchEvent(new PointerEvent('pointerleave'))
    }
  },
}
