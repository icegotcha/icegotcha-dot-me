import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import ProjectGallery from '.'

const images = [
  {
    src: '/images/portfolio/aaron-burden-y02jEX_B0O0-unsplash.webp',
    alt: 'Synthetic gallery fixture: library illustration',
    caption: 'Storybook fixture only: landscape concept illustration.',
    kind: 'conceptual-illustration' as const,
  },
  {
    src: '/images/portfolio/about-v1.webp',
    alt: 'Synthetic gallery fixture: cat illustration',
    caption: 'Storybook fixture only: portrait illustration.',
  },
]

const meta = {
  title: 'Organisms/ProjectGallery',
  component: ProjectGallery,
  args: { images },
} satisfies Meta<typeof ProjectGallery>
export default meta
type Story = StoryObj<typeof meta>
export const Multiple: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const gallery = canvas.getByRole('region', { name: 'Project gallery' })
    await userEvent.click(canvas.getByRole('button', { name: 'Next image' }))
    await expect(canvas.getByRole('button', { name: 'Go to image 2' })).toHaveAttribute(
      'aria-current',
      'true'
    )
    gallery.focus()
    await userEvent.keyboard('{ArrowLeft}')
    await expect(canvas.getByRole('button', { name: 'Go to image 1' })).toHaveAttribute(
      'aria-current',
      'true'
    )
    await userEvent.keyboard('{ArrowRight}')
    await expect(canvas.getByRole('button', { name: 'Go to image 2' })).toHaveAttribute(
      'aria-current',
      'true'
    )
    await userEvent.click(canvas.getByRole('button', { name: 'Go to image 1' }))
    await expect(canvas.getByRole('button', { name: 'Previous image' })).toBeDisabled()
  },
}
export const Single: Story = {
  args: { images: images.slice(0, 1) },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('img', { name: images[0].alt })).toBeInTheDocument()
    await expect(
      canvas.getByRole('button', { name: `View image: ${images[0].caption}` })
    ).toBeVisible()
    await expect(canvas.queryByRole('button', { name: 'Next image' })).not.toBeInTheDocument()
  },
}
export const Empty: Story = {
  args: { images: [] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.queryByRole('heading', { name: 'Visual showcase' })).not.toBeInTheDocument()
    await expect(canvasElement.querySelector('#gallery')).toBeNull()
    await expect(canvas.queryByRole('button')).not.toBeInTheDocument()
  },
}
export const WithoutCaptions: Story = {
  args: { images: images.map((image) => ({ ...image, caption: undefined })) },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const body = within(canvasElement.ownerDocument.body)
    await userEvent.click(canvas.getByRole('button', { name: `View image: ${images[0].alt}` }))
    const dialog = await body.findByRole('dialog', { name: 'Lightbox' }, { timeout: 5000 })
    await expect(within(dialog).queryByRole('paragraph')).not.toBeInTheDocument()
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(body.queryByRole('dialog')).not.toBeInTheDocument())
  },
}

export const LightboxViewer: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const body = within(canvasElement.ownerDocument.body)
    const trigger = canvas.getByRole('button', { name: `View image: ${images[1].caption}` })
    await userEvent.click(trigger)
    const dialog = await body.findByRole('dialog', { name: 'Lightbox' }, { timeout: 5000 })
    const viewer = within(dialog)
    function currentCaption(): HTMLElement {
      const caption = viewer
        .getAllByRole('paragraph')
        .find((element) => element.closest('.yarl__slide_current'))
      if (!caption) throw new Error('Missing active slide caption')
      return caption
    }
    await expect(dialog).toHaveAttribute('aria-modal', 'true')
    await waitFor(() => expect(viewer.getByRole('img', { name: images[1].alt })).toBeVisible())
    await expect(currentCaption()).toHaveTextContent(images[1].caption)
    await userEvent.keyboard('{ArrowLeft}')
    await waitFor(() => expect(viewer.getByRole('img', { name: images[0].alt })).toBeVisible())
    await waitFor(() => expect(currentCaption()).toHaveTextContent(images[0].caption))
    await userEvent.keyboard('{ArrowRight}')
    await waitFor(() => expect(viewer.getByRole('img', { name: images[1].alt })).toBeVisible())
    await waitFor(() => expect(currentCaption()).toHaveTextContent(images[1].caption))
    const zoomIn = viewer.getByRole('button', { name: 'Zoom in' })
    await waitFor(() => expect(zoomIn).toBeEnabled())
    await userEvent.click(zoomIn)
    await expect(viewer.getByRole('button', { name: 'Zoom out' })).toBeEnabled()
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(body.queryByRole('dialog')).not.toBeInTheDocument())
    await expect(trigger).toHaveFocus()
    await userEvent.keyboard('{Enter}')
    await body.findByRole('dialog', { name: 'Lightbox' }, { timeout: 5000 })
    await userEvent.click(body.getByRole('button', { name: 'Close' }))
    await waitFor(() => expect(body.queryByRole('dialog')).not.toBeInTheDocument())
  },
}
