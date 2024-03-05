import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { store } from '@/services/store'
import { Router } from '@/utils/router'

export function App() {
  return (
    <Provider store={store}>
      <Router />
      <ToastContainer />
    </Provider>
  )
}
