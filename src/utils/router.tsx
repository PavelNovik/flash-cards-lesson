import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { useGetMeQuery } from '@/components/auth/auth.service'
import { LoginForm } from '@/components/auth/login-form/login-form'
import { DecksPages } from '@/pages/decks-pages'
import { useGetDecksQuery } from '@/services/decks/decks.service'

const publicRoutes: RouteObject[] = [
  {
    element: <LoginForm />,
    path: '/login',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <div>hello</div>,
    path: '/',
  },
  {
    element: <DecksPages />,
    path: 'decks',
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
  const { data, isError } = useGetMeQuery()

  console.log(data)
  // const isAuthenticated = false
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to={'login'} />
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
  // console.log(data)
  // console.log(JSON.stringify(data))

  // return (
  //   <>
  {
    /*<DecksPages />*/
  }
  {
    /*<div>{JSON.stringify(data.items)}</div>*/
  }
  // </>
  // )

  // console.log(result)

  return <RouterProvider router={router} />
}
