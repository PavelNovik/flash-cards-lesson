import { ReactNode } from 'react'

type PageProps = {
  children: ReactNode
}
export const Page = ({ children }: PageProps) => {
  return <div>{children}</div>
}
