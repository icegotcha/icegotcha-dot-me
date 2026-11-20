import type { CSSProperties } from 'react'

export interface StarSpec {
  id: string
  top: string
  left: string
  variant: 'dot' | 'sparkle' | 'diamond'
  size: number
  duration: number
  delay: number
  color?: string
  visibility?: string
}

/** A single star/sparkle. Hovering its (slightly padded) hit zone brightens it — stars never chase the pointer. */
export default function Star({ spec }: { spec: StarSpec }) {
  const style = {
    top: spec.top,
    left: spec.left,
    '--hero-star-duration': `${spec.duration * 1.9}s`,
    '--hero-star-delay': `${-spec.delay * 2}s`,
  } as CSSProperties

  const isDiamond = spec.variant === 'diamond'
  const size = isDiamond ? spec.size * 0.72 : spec.size
  const shapeClass = isDiamond ? 'rotate-45 rounded-[1px]' : 'rounded-full'

  return (
    <span
      className={`group absolute -m-3 p-3 ${spec.visibility ?? ''}`}
      style={style}
      aria-hidden="true"
    >
      {spec.variant === 'sparkle' ? (
        <svg
          width={spec.size}
          height={spec.size}
          viewBox="0 0 20 20"
          className="hero-star-twinkle block transition-transform duration-300 group-hover:scale-125"
        >
          <path
            d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z"
            fill={spec.color ?? '#FFFFFF'}
          />
        </svg>
      ) : (
        <span
          className={`hero-star-twinkle block ${shapeClass} transition-transform duration-300 group-hover:scale-125`}
          style={{ width: size, height: size, background: spec.color ?? '#FFFFFF' }}
        />
      )}
    </span>
  )
}
