import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

export type Textfield = {
  className?: string
  errorMessage?: string
  label?: string
  placeholder?: string
  type: string
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<ElementRef<'input'>, Textfield>((props, ref) => {
  const { errorMessage, label, ...rest } = props

  return (
    <div>
      <label htmlFor={rest.name}>{label} </label>
      <input id={rest.name} ref={ref} style={{ backgroundColor: 'inherit' }} {...rest} />
      {errorMessage && <span style={{ color: 'red', fontSize: '15px' }}>{errorMessage}</span>}
    </div>
  )
})
