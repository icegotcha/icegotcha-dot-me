import Image, { type ImageProps } from 'next/image'
import type { ReactElement } from 'react'

interface StoryImageProps {
  src: ImageProps['src']
  alt: string
  tilt: 'left' | 'right'
}

export default function StoryImage({ src, alt, tilt }: StoryImageProps): ReactElement {
  return (
    <div className="mx-auto w-full max-w-[460px] px-6 pb-7 pt-5 sm:px-8">
      <div
        className={`relative aspect-square overflow-hidden rounded-2xl bg-[#1B142D] ${
          tilt === 'left' ? '-rotate-3 lg:-rotate-4' : 'rotate-3 lg:rotate-4'
        }`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 480px) 80vw, 400px"
          className="object-cover"
        />
      </div>
    </div>
  )
}
