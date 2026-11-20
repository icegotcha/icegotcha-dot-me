import type { ReactElement, ReactNode } from 'react'
import { PIXEL } from '@/lib/fonts'

interface HeroObjectTooltipProps {
  children: ReactNode
  id?: string
  decorative?: boolean
  placement?: 'above' | 'below'
  align?: 'center' | 'start'
  visible?: boolean
}

/** One visual treatment for object hints; the parent group supplies hover/focus state. */
export default function HeroObjectTooltip({
  children,
  id,
  decorative = false,
  placement = 'above',
  align = placement === 'below' ? 'start' : 'center',
  visible = false,
}: HeroObjectTooltipProps): ReactElement {
  return (
    <span
      id={id}
      role={decorative ? undefined : 'tooltip'}
      aria-hidden={decorative || undefined}
      data-placement={placement}
      data-align={align}
      className={`hero-object-tooltip pointer-events-none absolute ${placement === 'above' ? 'bottom-[100%] mb-2' : 'top-[100%] mt-2'} ${align === 'start' ? 'left-0' : 'left-1/2 -translate-x-1/2'} z-40 w-max max-w-[min(12rem,70vw)] text-left text-sm leading-snug text-[#F7EFE2] ${visible ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'} transition-opacity duration-150 motion-reduce:transition-none`}
      style={PIXEL}
    >
      <span className="hero-object-tooltip-border block p-[2px]">
        <span className="hero-object-tooltip-surface block px-3 py-2">{children}</span>
      </span>
      <svg
        aria-hidden="true"
        viewBox="0 0 16 10"
        className="hero-object-tooltip-tail absolute h-[10px] w-4"
        shapeRendering="crispEdges"
      >
        <path d="M0 0H16V4H12V7H9V10H6V7H3V4H0Z" fill="#B9A8E6" />
        <path d="M2 0H14V2H10V5H8V7H7V5H5V2H2Z" fill="#251B3D" />
      </svg>
    </span>
  )
}
