'use client'

import type { ReactElement } from 'react'
import Link from 'next/link'
import { MONO } from '@/lib/fonts'

interface NavigationLinkProps {
  link: { label: string; href: string }
  currentPath: string | null
  className: string
  onClick?: () => void
}

export default function NavigationLink({
  link,
  currentPath,
  className,
  onClick,
}: NavigationLinkProps): ReactElement {
  return (
    <Link
      href={currentPath === '/' && link.href.startsWith('/#') ? link.href.slice(1) : link.href}
      aria-current={link.href === currentPath ? 'page' : undefined}
      className={className}
      style={MONO}
      onClick={onClick}
    >
      {link.label}
    </Link>
  )
}
