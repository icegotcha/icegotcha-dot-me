'use client'

import { useEffect } from 'react'

export default function SiteInteractionGuard(): null {
  useEffect(() => {
    function preventContextMenu(event: MouseEvent): void {
      if (event.target instanceof Element && event.target.closest('[data-contact-form]')) return
      event.preventDefault()
    }

    document.addEventListener('contextmenu', preventContextMenu)
    return () => document.removeEventListener('contextmenu', preventContextMenu)
  }, [])

  return null
}
