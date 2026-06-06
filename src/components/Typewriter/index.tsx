'use client'

import { useEffect, useState } from 'react'
import styles from './Typewriter.module.css'

type Props = {
  text: string
  className?: string
  duration?: number // milliseconds
}

export default function Typewriter({
  text,
  className = '',
  duration = 2000,
}: Props) {
  const [count, setCount] = useState(text.length)

  useEffect(() => {
    setCount(0)
    const perChar = duration / text.length
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          clearInterval(id)
          return c
        }
        return c + 1
      })
    }, perChar)
    return () => clearInterval(id)
  }, [text, duration])

  return (
    <span
      className={`typewriter relative inline-block whitespace-nowrap ${className}`}
      aria-label={text}
    >
      <span aria-hidden className='invisible'>
        {text}
      </span>
      <span className='absolute top-0 left-0' aria-hidden>
        {text.slice(0, count)}
        <span
          className={`transition-opacity duration-200 ${
            count >= text.length
              ? 'opacity-0 group-hover:opacity-100'
              : 'opacity-100'
          }`}
        >
          <span className={styles['typewriter-caret']} />
        </span>
      </span>
    </span>
  )
}
