import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import clsx from 'clsx'

const containerStyles = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: '50px auto',
  maxWidth: '968px',
}

export const Container = forwardRef<ElementRef<'div'>, ComponentPropsWithoutRef<'div'>>(
  ({ className, ...rest }, ref) => {
    const classNames = clsx(className)

    return <div className={classNames} ref={ref} style={containerStyles} {...rest} />
  }
)
