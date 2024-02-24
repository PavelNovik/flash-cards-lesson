import { Provider } from 'react-redux'

import { store } from '@/services/store'
import { Router } from '@/utils/router'

export function App() {
  return (
    // <div>
    //   <br />
    //   <Button as={'a'} href={'google.com'} variant={'primary'}>
    //     hello
    //   </Button>
    //   <br />
    //   <Button variant={'primary'}>hello</Button>
    // </div>
    <Provider store={store}>
      <Router />
    </Provider>
  )
}
