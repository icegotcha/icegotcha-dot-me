'use client'

import { useEffect, type ReactElement } from 'react'
import { motion, useIsPresent, useReducedMotion } from 'motion/react'
import NavigationLink from '@/components/atoms/NavigationLink'

interface MobileNavigationProps {
  links: ReadonlyArray<{ label: string; href: string }>
  currentPath: string | null
  animateEntrance: boolean
  onClose: () => void
}

const ENTRANCE_EASE = [0.16, 1, 0.3, 1] as const

export default function MobileNavigation({
  links,
  currentPath,
  animateEntrance,
  onClose,
}: MobileNavigationProps): ReactElement {
  const isPresent = useIsPresent()
  const reducedMotion = useReducedMotion()
  const spatialMotion = animateEntrance && !reducedMotion
  const duration = spatialMotion ? 0.18 : 0.08

  useEffect(() => {
    if (!isPresent) return

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape') onClose()
    }

    const desktop = window.matchMedia('(min-width: 768px)')
    function handleViewportChange(event: MediaQueryListEvent): void {
      if (event.matches) onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    desktop.addEventListener('change', handleViewportChange)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      desktop.removeEventListener('change', handleViewportChange)
    }
  }, [isPresent, onClose])

  return (
    <motion.nav
      id="mobile-navigation"
      aria-label="Mobile navigation"
      aria-hidden={!isPresent || undefined}
      inert={!isPresent}
      initial={animateEntrance ? { opacity: 0, y: spatialMotion ? -4 : 0 } : false}
      animate={{ opacity: 1, y: 0 }}
      exit={{
        opacity: 0,
        y: spatialMotion ? -4 : 0,
        transition: { duration: animateEntrance ? 0.08 : 0 },
      }}
      transition={{
        duration: animateEntrance ? duration : 0,
        ease: ENTRANCE_EASE,
      }}
      className="flex h-[calc(100dvh-4rem)] flex-col overflow-y-auto overscroll-contain bg-[#120E20] px-5 py-4 md:hidden"
    >
      {links.map((link, index) => (
        <motion.div
          key={link.href}
          initial={animateEntrance ? { opacity: 0, x: spatialMotion ? -6 : 0 } : false}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: spatialMotion ? 0.18 : 0.08,
            delay: spatialMotion ? index * 0.025 : 0,
            ease: ENTRANCE_EASE,
          }}
          className="shrink-0 border-b border-[rgba(251,249,255,0.14)] last:border-b-0"
        >
          <NavigationLink
            link={link}
            currentPath={currentPath}
            onClick={onClose}
            className="flex min-h-16 items-center py-3 text-[2rem] leading-tight capitalize text-[#FBF9FF] transition-colors hover:text-[#FFD03A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD03A] active:text-[#FFD03A] aria-[current=page]:text-[#FFD03A] motion-reduce:transition-none"
          />
        </motion.div>
      ))}
    </motion.nav>
  )
}
