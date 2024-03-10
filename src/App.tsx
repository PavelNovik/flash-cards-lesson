import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { Router } from '@/utils/router'

import { store } from './services/store'

export function App() {
  return (
    <Provider store={store}>
      <Router />
      <ToastContainer />
    </Provider>
  )
}
