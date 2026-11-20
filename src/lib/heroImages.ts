import { HERO_IMAGE_MANIFEST } from './heroImageManifest'

export type HeroImageSrc = keyof typeof HERO_IMAGE_MANIFEST

interface HeroImageProps {
  src: string
  srcSet: string
  sizes: string
  width: number
  height: number
}

/** Keep source artwork intact while the browser selects a size suited to the screen and DPR. */
export function getHeroImageProps(src: HeroImageSrc): HeroImageProps {
  const image = HERO_IMAGE_MANIFEST[src]
  const name = src.slice('/images/hero/'.length, -'.webp'.length)
  const candidates = image.widths.map(
    (width) => `/images/hero/responsive/${name}-${width}.webp ${width}w`
  )
  candidates.push(`${src} ${image.width}w`)
  return {
    src,
    srcSet: candidates.join(', '),
    sizes: image.sizes,
    width: image.width,
    height: image.height,
  }
}
