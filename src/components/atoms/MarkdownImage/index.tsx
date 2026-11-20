import type { ComponentProps, ReactElement } from 'react'
import Image from 'next/image'

export default function MarkdownImage({
  src,
  alt,
  title,
}: ComponentProps<'img'>): ReactElement | null {
  if (typeof src !== 'string' || !src) return null

  const isLocal = src.startsWith('/') && !src.startsWith('//')

  return (
    <span className="relative my-5 block aspect-[3/2] w-full">
      <Image
        src={src}
        alt={alt ?? ''}
        title={title}
        fill
        sizes="(max-width: 768px) calc(100vw - 40px), 650px"
        loading="lazy"
        unoptimized={!isLocal}
        className="rounded-xl object-contain"
      />
    </span>
  )
}
