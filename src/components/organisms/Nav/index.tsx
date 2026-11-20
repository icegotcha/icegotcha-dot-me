'use client'

import Button from '@/components/atoms/Button'

import { useCallback, useEffect, useRef, useState, type ReactElement } from 'react'
import { AnimatePresence, useMotionValueEvent, useScroll } from 'motion/react'
import NavigationLink from '@/components/atoms/NavigationLink'
import MobileNavigation from '@/components/molecules/MobileNavigation'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { PRESS } from '@/lib/fonts'

const NAV_LINKS = [
  { label: 'home', href: '/#home' },
  { label: 'about', href: '/#about' },
  { label: 'My Story', href: '/story' },
  { label: 'gallery', href: '/gallery' },
  { label: 'work', href: '/#work' },
  { label: 'writing', href: '/#writing' },
  { label: 'contact', href: '/#contact' },
] as const

export default function Nav(): ReactElement {
  const currentPath = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [animateMenu, setAnimateMenu] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const scrolledRef = useRef(false)
  const { scrollY } = useScroll()

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    if (!menuOpen) return
    const menuButton = menuButtonRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handlePointerDown(event: PointerEvent): void {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) closeMenu()
    }

    document.addEventListener('pointerdown', handlePointerDown, true)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, true)
      document.body.style.overflow = previousOverflow
      menuButton?.focus({ preventScroll: true })
    }
  }, [menuOpen, closeMenu])

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const next = latest > 48
    if (next === scrolledRef.current) return
    scrolledRef.current = next
    setScrolled(next)
  })

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color] duration-300 motion-reduce:transition-none ${menuOpen ? 'border-b-0' : ''} ${
        scrolled || menuOpen
          ? 'border-[rgba(251,249,255,0.14)] bg-[rgba(18,14,32,0.94)] backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 md:px-8">
        <a
          href={currentPath === '/' ? '#home' : '/#home'}
          className="text-xs tracking-widest text-[#FBF9FF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD03A]"
          style={PRESS}
        >
          icegotcha.me
        </a>
        <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <NavigationLink
              key={link.href}
              link={link}
              currentPath={currentPath}
              className="text-sm capitalize tracking-wide text-[#FBF9FF] transition-colors hover:text-[#FFD03A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD03A]"
            />
          ))}
        </nav>
        <Button
          ref={menuButtonRef}
          variant="plain"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className={`inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg border px-3 text-[0.625rem] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD03A] motion-reduce:transition-none md:hidden ${
            menuOpen
              ? 'border-[#FFD03A] bg-[#FFD03A] text-[#3A2D6A] hover:bg-[#FFE080] active:bg-[#FFE080]'
              : 'border-[rgba(251,249,255,0.4)] bg-[#251B3D] text-[#FBF9FF] hover:border-[#FFD03A] hover:text-[#FFD03A] active:bg-[#3A2D6A]'
          }`}
          style={PRESS}
          onClick={(event) => {
            setAnimateMenu(event.detail > 0)
            setMenuOpen((value) => !value)
          }}
        >
          {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          <span>{menuOpen ? 'Close' : 'Menu'}</span>
        </Button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <MobileNavigation
            links={NAV_LINKS}
            currentPath={currentPath}
            animateEntrance={animateMenu}
            onClose={closeMenu}
          />
        )}
      </AnimatePresence>
    </header>
  )
}
