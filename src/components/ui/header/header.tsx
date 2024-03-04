import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Link } from 'react-router-dom'

import { Auth } from '@/components/auth/auth.types'
import { Button } from '@/components/ui/button'
export type HeaderProps = {
  data: Auth
  isLoggedIn: boolean
}
export const Header = forwardRef<
  ElementRef<'header'>,
  ComponentPropsWithoutRef<'header'> & HeaderProps
>(({ data, isLoggedIn, ...rest }, ref) => {
  return (
    <header
      ref={ref}
      style={{ backgroundColor: 'brown', height: '40px', padding: '10px' }}
      {...rest}
    >
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
        <Link to={'/'}>Logo</Link>
        {isLoggedIn && <div>{data.name}</div>}
        {!isLoggedIn && (
          <div>
            Need to logg in
            <Button style={{ marginLeft: '50px' }}>Log in</Button>
          </div>
        )}
      </div>
    </header>
  )
})
