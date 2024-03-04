import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
export type HeaderProps = {
  isLoggedIn: boolean
}
export const Header = forwardRef<
  ElementRef<'header'>,
  ComponentPropsWithoutRef<'header'> & HeaderProps
>(({ isLoggedIn, ...rest }, ref) => {
  return (
    <header
      ref={ref}
      style={{ backgroundColor: 'brown', height: '40px', padding: '10px' }}
      {...rest}
    >
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
        <Link to={'/'}>Logo</Link>
        {!isLoggedIn && (
          <div>
            UserName
            <Button style={{ marginLeft: '50px' }}>Log in</Button>
          </div>
        )}
      </div>
    </header>
  )
})
