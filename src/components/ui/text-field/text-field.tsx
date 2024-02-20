import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

export type Textfield = {
  className?: string
  control?: any
  errorMessage?: string
  label: string
  onChange?: (value: string) => void
  value?: string
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<ElementRef<'input'>, Textfield>((props, ref) => {
  const { errorMessage, label, name, onChange, value, ...rest } = props

  return (
    <div>
      <label htmlFor={name}>{label} </label>
      <input
        {...rest}
        defaultValue={rest.defaultValue}
        id={name}
        onChange={onChange}
        ref={ref}
        style={{ backgroundColor: 'inherit' }}
      />
      {errorMessage && <span style={{ color: 'red', fontSize: '15px' }}>{errorMessage}</span>}
    </div>
  )
})
