import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

export type Textfield = {
  className?: string
  errorMessage?: string
  label?: string
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<ElementRef<'input'>, Textfield>((props, ref) => {
  const { errorMessage, name, ...rest } = props

  return (
    <div>
      <label htmlFor={name} style={{ fontSize: '10px' }}>
        {rest.label}{' '}
      </label>
      <input {...rest} id={name} ref={ref} style={{ backgroundColor: 'inherit' }} />
      {errorMessage && <span style={{ color: 'red', fontSize: '15px' }}>{errorMessage}</span>}
    </div>
  )
})
