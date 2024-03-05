import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { LoginPage } from '@/components/auth/login-page/login-page'
import { Layout } from '@/components/ui/Layout/layout'
import { Loader } from '@/components/ui/loader/loader'
import { DecksPages } from '@/pages/decks-pages'
import { useGetMeQuery } from '@/services/auth/auth.service'
import { useGetDecksQuery } from '@/services/decks/decks.service'

const publicRoutes: RouteObject[] = [
  {
    element: <LoginPage />,
    path: 'login',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <div>hello</div>,
    path: 'decks',
  },
  {
    element: <DecksPages />,
    path: '/',
  },
]

// const router = createBrowserRouter([...privateRoutes, ...publicRoutes])

const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      ...publicRoutes,
    ],
    element: <Layout />,
  },
])

function PrivateRoutes() {
  const { data, isError } = useGetMeQuery()

  const isAuthenticated = !isError

  console.log(isAuthenticated)

  return isAuthenticated ? <Outlet /> : <Navigate to={'login'} />
}
export const Router = () => {
  // const result = useGetDecksQuery()
  const { data, isError, isLoading } = useGetDecksQuery()

  if (isLoading) {
    return (
      <div style={{ margin: '100px auto' }}>
        <Loader />
      </div>
    )
  }

  return <RouterProvider router={router} />
}
