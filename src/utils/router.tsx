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

  console.log(data)
  const isAuthenticated = !isError

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

  // if (isError) {
  //   return <div>...Error</div>
  // }
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
