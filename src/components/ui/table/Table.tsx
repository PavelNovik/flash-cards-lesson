import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import clsx from 'clsx'

import s from './Table.module.scss'

export const Table = forwardRef<HTMLTableElement, ComponentPropsWithoutRef<'table'>>(
  ({ className, ...rest }, ref) => {
    const classNames = clsx(className, s.table)

    return <table className={classNames} ref={ref} {...rest} />
  }
)
export const TableHead = forwardRef<ElementRef<'thead'>, ComponentPropsWithoutRef<'thead'>>(
  ({ ...rest }, ref) => {
    return <thead {...rest} ref={ref} />
  }
)

export const TableBody = forwardRef<ElementRef<'tbody'>, ComponentPropsWithoutRef<'tbody'>>(
  ({ ...rest }, ref) => {
    return <tbody ref={ref} {...rest} />
  }
)

export const TableRow = forwardRef<ElementRef<'tr'>, ComponentPropsWithoutRef<'tr'>>(
  ({ ...rest }, ref) => {
    return <tr ref={ref} {...rest} />
  }
)

export const TableHeader = forwardRef<ElementRef<'th'>, ComponentPropsWithoutRef<'th'>>(
  ({ ...rest }, ref) => {
    const classNames = clsx(s.tableHeader)

    return <th className={classNames} ref={ref} {...rest} />
  }
)
export const TableData = forwardRef<ElementRef<'td'>, ComponentPropsWithoutRef<'td'>>(
  ({ ...rest }, ref) => {
    const classNames = clsx(s.tableData)

    return <td className={classNames} ref={ref} {...rest} />
  }
)
