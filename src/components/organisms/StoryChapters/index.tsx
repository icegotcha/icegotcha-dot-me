import type { ReactElement } from 'react'
import StoryImage from '@/components/atoms/StoryImage'
import StoryChapter from '@/components/molecules/StoryChapter'
import { STORY_CONTENT } from '@/content/story'

export default function StoryChapters(): ReactElement {
  return (
    <div className="dream-section border-b-0 lg:py-20">
      <div className="mx-auto max-w-[640px] space-y-20 lg:max-w-none lg:space-y-28">
        {STORY_CONTENT.chapters.map((chapter, index) => {
          const galleryOnLeft = index % 2 === 1

          return (
            <div
              key={chapter.id}
              className={`grid items-center gap-14 ${
                galleryOnLeft
                  ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]'
                  : 'lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]'
              }`}
            >
              <div className={galleryOnLeft ? undefined : 'lg:order-2'}>
                <StoryImage
                  src={chapter.image.img}
                  alt={chapter.image.alt}
                  tilt={galleryOnLeft ? 'right' : 'left'}
                />
              </div>
              <StoryChapter chapter={chapter} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
