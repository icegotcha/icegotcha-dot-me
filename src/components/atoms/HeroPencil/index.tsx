'use client'

import { getHeroImageProps } from '@/lib/heroImages'
import { useEffect, type ReactElement } from 'react'
import { motion, useMotionValue, useReducedMotion } from 'motion/react'
import { useHeroActivity } from '@/lib/heroParallax'
import { getDoodleFrame, subscribeDoodleFrame } from '@/lib/heroDoodle'

/** The existing pencil artwork follows the same normalized path and clock as the ink. */
export default function HeroPencil(): ReactElement {
  const active = useHeroActivity()
  const reducedMotion = Boolean(useReducedMotion()) || !active
  const x = useMotionValue('18%')
  const y = useMotionValue('70%')

  useEffect(() => {
    function update({ tip }: ReturnType<typeof getDoodleFrame>): void {
      x.set(`${tip[0] * 100}%`)
      y.set(`${tip[1] * 100}%`)
    }
    if (reducedMotion) {
      update(getDoodleFrame(0, true))
      return
    }
    return subscribeDoodleFrame(update)
  }, [reducedMotion, x, y])

  return (
    <div className="relative aspect-[1374/1145] w-full rotate-[8deg]">
      <div className="pointer-events-none absolute left-[28%] top-[29%] h-[42%] w-[40%] -rotate-[12deg]">
        <motion.div data-hero-pencil-drawing style={{ x, y }} className="absolute inset-0">
          <div className="absolute left-0 top-0 w-[200%] origin-top-left -rotate-[24deg]">
            <img
              loading="lazy"
              fetchPriority="low"
              decoding="async"
              {...getHeroImageProps('/images/hero/pencil.webp')}
              alt=""
              className="pointer-events-none block w-full max-w-none -translate-x-[9%] -translate-y-[8.5%]"
              draggable={false}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
