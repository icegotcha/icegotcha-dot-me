import type { ComponentProps, ReactElement } from 'react'
import { Slot } from '@radix-ui/react-slot'

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'outline' | 'plain'
  asChild?: boolean
}

const VARIANT_CLASSES = {
  primary: 'dream-button',
  outline: 'dream-button-outline',
  plain: '',
}

export default function Button({
  variant = 'primary',
  asChild = false,
  className,
  type = 'button',
  ...props
}: ButtonProps): ReactElement {
  const classes = [VARIANT_CLASSES[variant], className].filter(Boolean).join(' ')

  if (asChild) {
    return <Slot className={classes} {...props} />
  }

  return <button type={type} className={classes} {...props} />
}
