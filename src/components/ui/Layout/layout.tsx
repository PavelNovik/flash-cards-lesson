import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

import { Header, HeaderProps } from '@/components/ui/header/header'
import { useGetMeQuery } from '@/services/auth/auth.service'

export const Layout = () => {
  const { data, isError, isLoading } = useGetMeQuery()
  const isAuthentificated = !isError && !isLoading

  // console.log(isAuthentificated)

  return (
    <LayoutBase data={data ?? {}} isLoggedIn={isAuthentificated}>
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
