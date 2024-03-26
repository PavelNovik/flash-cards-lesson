import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useLogoutMutation } from '@/services/auth/auth.service'
import { Auth } from '@/services/auth/auth.types'

export type HeaderProps = {
  data: Auth
  isLoggedIn: boolean
}
export const Header = forwardRef<
  ElementRef<'header'>,
  ComponentPropsWithoutRef<'header'> & HeaderProps
>(({ data, isLoggedIn, ...rest }, ref) => {
  const [logout] = useLogoutMutation()

  return (
    <header
      ref={ref}
      style={{ backgroundColor: 'brown', height: '60px', padding: '10px' }}
      {...rest}
    >
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
        <Link to={'/'}>Logo</Link>
        {isLoggedIn && (
          <div style={{ alignItems: 'center', display: 'flex', gap: '20px' }}>
            <img src={data.avatar ?? ''} style={{ width: '40px' }} />
            {data.name}
            <div>
              <Button onClick={() => logout()}>Logout</Button>
            </div>
          </div>
        )}
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
