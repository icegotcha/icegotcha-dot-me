'use client'

import type { ReactElement } from 'react'
import { ArrowLeft, ArrowRight, Maximize, Minimize, X, ZoomIn, ZoomOut } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import Lightbox, { type SlideImage } from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import { MONO } from '@/lib/fonts'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import styles from './ImageViewer.module.css'

interface ImageViewerProps {
  slides: SlideImage[]
  index: number
  open: boolean
  onClose: () => void
}

const PLUGINS = [Zoom, Fullscreen, Captions]

export default function ImageViewer({
  slides,
  index,
  open,
  onClose,
}: ImageViewerProps): ReactElement {
  const reducedMotion = useReducedMotion()

  return (
    <Lightbox
      open={open}
      close={onClose}
      index={index}
      slides={slides}
      plugins={PLUGINS}
      carousel={{ imageFit: 'contain', preload: 1 }}
      controller={{ aria: true }}
      captions={{ descriptionTextAlign: 'center' }}
      zoom={{ maxZoomPixelRatio: 3 }}
      animation={reducedMotion ? { fade: 0, swipe: 0, navigation: 0, zoom: 0 } : undefined}
      className={styles.viewer}
      styles={{
        root: {
          '--yarl__color_backdrop': '#100E20F5',
          '--yarl__color_button': '#FBF9FF',
          '--yarl__color_button_active': '#FFD03A',
          '--yarl__color_button_disabled': '#C7BBD966',
          '--yarl__button_filter': 'none',
          ...MONO,
        },
        button: { minWidth: 44, minHeight: 44 },
        captionsDescriptionContainer: { background: '#100E20E6' },
        captionsDescription: {
          fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
          lineHeight: 1.5,
          overflowWrap: 'anywhere',
        },
      }}
      render={{
        iconPrev: () => <ArrowLeft aria-hidden="true" />,
        iconNext: () => <ArrowRight aria-hidden="true" />,
        iconClose: () => <X aria-hidden="true" />,
        iconZoomIn: () => <ZoomIn aria-hidden="true" />,
        iconZoomOut: () => <ZoomOut aria-hidden="true" />,
        iconEnterFullscreen: () => <Maximize aria-hidden="true" />,
        iconExitFullscreen: () => <Minimize aria-hidden="true" />,
      }}
    />
  )
}
