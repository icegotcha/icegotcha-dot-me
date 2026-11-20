import type { ReactElement } from 'react'
import { MONO } from '@/lib/fonts'

interface BrandIconProps {
  path: string
  label: string
  className?: string
}

export default function BrandIcon({ path, label, className }: BrandIconProps): ReactElement {
  return (
    <span
      className={`flex flex-col items-center gap-2 text-[0.65rem] text-[#D5CCE6] ${className ?? ''}`}
      style={MONO}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
        className="size-6 shrink-0 text-[#E8D6F3]"
      >
        <path d={path} />
      </svg>
      <span>{label}</span>
    </span>
  )
}
