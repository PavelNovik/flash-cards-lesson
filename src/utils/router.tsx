import { Navigate, Outlet, RouteObject, createBrowserRouter } from 'react-router-dom'

import { DecksPages } from '@/pages/decks-pages'
import { useGetDecksQuery } from '@/services/base-api'

const publicRoutes: RouteObject[] = [
  {
    element: <div>login</div>,
    path: '/login',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <div>hello</div>,
    path: '/',
  },
]

// const router = createBrowserRouter([...privateRoutes, ...publicRoutes])

const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
  ...publicRoutes,
])

function PrivateRoutes() {
  // const isAuthenticated = false
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}
export const Router = () => {
  // const result = useGetDecksQuery()
  const { data, isError, isLoading } = useGetDecksQuery()

  if (isLoading) {
    return <div>...Loading</div>
  }

  if (isError) {
    return <div>...Error</div>
  }
  console.log(data)

  return (
    <>
      <DecksPages />
      {/*<div>{JSON.stringify(data.items)}</div>*/}
    </>
  )

  // console.log(result)

  // return <RouterProvider router={router} />
}
