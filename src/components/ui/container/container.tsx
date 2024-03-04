import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import clsx from 'clsx'

import s from './container.module.scss'

export const Container = forwardRef<ElementRef<'div'>, ComponentPropsWithoutRef<'div'>>(
  ({ className, ...rest }, ref) => {
    const classNames = clsx(s.container, className)

    return <div className={classNames} ref={ref} {...rest} />
  }
)
