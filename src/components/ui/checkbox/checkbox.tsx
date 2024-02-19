import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import s from './checkbox.module.scss'

export type FormCheckboxT = {
  checked?: boolean
  label?: string
  name: string
  onValueChange?: (checked: boolean) => void
} & ComponentPropsWithoutRef<'button'>

export const FormCheckbox = forwardRef<ElementRef<'button'>, FormCheckboxT>((props, ref) => {
  const { checked, label, name, onValueChange, ...rest } = props

  return (
    <>
      <div style={{ alignItems: 'center', display: 'flex' }}>
        <Checkbox.Root
          className={s.CheckboxRoot}
          id={name}
          onCheckedChange={onValueChange}
          ref={ref}
          {...rest}
        >
          <Checkbox.Indicator className={s.CheckboxIndicator}>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label className={s.Label} htmlFor={name}>
          {label}
        </label>
      </div>
    </>
  )
})
