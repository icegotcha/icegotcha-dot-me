'use client'

import { useEffect, useState, type ReactElement } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { PIXEL } from '@/lib/fonts'

export interface Gallery4Item {
  id: string
  title: string
  description?: string
  image: string
  imageAlt: string
}

export interface Gallery4Props {
  title: string
  description?: string
  items: Gallery4Item[]
  onImageClick: (index: number) => void
}

export function Gallery4({ title, description, items, onImageClick }: Gallery4Props): ReactElement {
  const [api, setApi] = useState<CarouselApi>()
  const [selection, setSelection] = useState({ current: 0, previous: false, next: false })
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!api) return
    function updateSelection(): void {
      if (!api) return
      setSelection({
        current: api.selectedScrollSnap(),
        previous: api.canScrollPrev(),
        next: api.canScrollNext(),
      })
    }
    updateSelection()
    api.on('select', updateSelection)
    api.on('reInit', updateSelection)
    return () => {
      api.off('select', updateSelection)
      api.off('reInit', updateSelection)
    }
  }, [api])

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: 'start',
        containScroll: false,
        duration: reducedMotion ? 0 : 25,
        breakpoints: { '(max-width: 768px)': { dragFree: true } },
      }}
      aria-label="Project gallery"
      tabIndex={items.length > 1 ? 0 : undefined}
      className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD03A]"
    >
      <div className="mb-8 flex items-end justify-between gap-6 md:mb-14 lg:mb-16">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-medium text-[#FBF9FF] md:text-4xl lg:text-5xl" style={PIXEL}>
            {title}
          </h2>
          {description && <p className="max-w-lg text-[#C7BBD9]">{description}</p>}
        </div>
        {items.length > 1 && (
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              aria-label="Previous image"
              disabled={!selection.previous}
              onClick={() => api?.scrollPrev(Boolean(reducedMotion))}
              className="size-11 text-[#FBF9FF] focus-visible:ring-[#FFD03A] disabled:pointer-events-auto"
            >
              <ArrowLeft className="size-5" aria-hidden="true" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              aria-label="Next image"
              disabled={!selection.next}
              onClick={() => api?.scrollNext(Boolean(reducedMotion))}
              className="size-11 text-[#FBF9FF] focus-visible:ring-[#FFD03A] disabled:pointer-events-auto"
            >
              <ArrowRight className="size-5" aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>
      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
        <div className="mx-auto max-w-[1100px] px-5 md:px-8 [&_[data-slot=carousel-content]]:overflow-visible">
          <CarouselContent className="-ml-5">
            {items.map((item, index) => (
              <CarouselItem
                key={item.id}
                aria-label={`Image ${index + 1} of ${items.length}`}
                className="max-w-[320px] pl-5 lg:max-w-[360px]"
              >
                <button
                  type="button"
                  aria-label={`View image: ${item.title}`}
                  aria-haspopup="dialog"
                  onClick={() => onImageClick(index)}
                  className="group relative block w-full max-w-full min-h-[27rem] cursor-pointer text-left overflow-hidden rounded-xl bg-[#20152F] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#FFD03A] md:aspect-[5/4] lg:aspect-[16/9]"
                >
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 1023px) 300px, 340px"
                    loading="lazy"
                    draggable={false}
                    className="object-cover object-center transition-transform duration-300 motion-safe:group-hover:scale-105 motion-reduce:transition-none"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-b from-[#100E20]/0 via-[#100E20]/40 to-[#100E20]/95"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-[#FBF9FF] md:p-8">
                    <span
                      role="heading"
                      aria-level={3}
                      className="mb-3 pt-4 text-xl font-semibold leading-snug"
                      style={PIXEL}
                    >
                      {item.title}
                    </span>
                    {item.description && (
                      <span className="mb-8 line-clamp-2 md:mb-12 lg:mb-9">{item.description}</span>
                    )}
                    <span className="mt-5 flex items-center text-sm">
                      View image
                      <ArrowRight
                        className="ml-2 size-5 transition-transform motion-safe:group-hover:translate-x-1 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </div>
      {items.length > 1 && (
        <div className="mt-8 flex flex-wrap justify-center" aria-label="Choose gallery image">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Go to image ${index + 1}`}
              aria-current={selection.current === index ? 'true' : undefined}
              onClick={() => api?.scrollTo(index, Boolean(reducedMotion))}
              className="flex size-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD03A]"
            >
              <span
                className={`size-2 rounded-full ${selection.current === index ? 'bg-[#FFD03A]' : 'bg-[#FFD03A]/20'}`}
              />
            </button>
          ))}
        </div>
      )}
    </Carousel>
  )
}
