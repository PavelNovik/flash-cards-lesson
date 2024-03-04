import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

import { useGetMeQuery } from '@/components/auth/auth.service'
import { Header, HeaderProps } from '@/components/ui/header/header'

export const Layout = () => {
  const { data, isError, isLoading } = useGetMeQuery()
  const isAuthentificated = !isError && !isLoading

  console.log(data)

  return (
    <LayoutBase isLoggedIn={isAuthentificated}>
      <Outlet />
    </LayoutBase>
  )
}

export type LayoutBaseProps = {
  children: ReactNode
} & HeaderProps
export const LayoutBase = ({ children, ...headerProps }: LayoutBaseProps) => {
  return (
    <div>
      <Header {...headerProps} />
      <div>{children}</div>
    </div>
  )
}
