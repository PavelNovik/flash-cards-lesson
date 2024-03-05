import { useNavigate } from 'react-router-dom'
import { Bounce, toast } from 'react-toastify'

import { LoginForm } from '@/components/auth/login-form/login-form'
import { Page } from '@/components/ui/page/page'
import { useLoginMutation } from '@/services'
import { LoginArgs } from '@/services/auth/auth.types'

export const LoginPage = () => {
  const [login] = useLoginMutation()
  const navigate = useNavigate()

  const handleLogin = (data: LoginArgs) => {
    login(data)
      .unwrap()
      .then(() => {
        navigate('/')
      })
      .catch(err =>
        toast.error(err.data.message, {
          autoClose: 5000,
          closeOnClick: true,
          draggable: true,
          hideProgressBar: false,
          pauseOnHover: true,
          position: 'top-center',
          progress: undefined,
          theme: 'dark',
          transition: Bounce,
        })
      )
    // .finally(() => {
    //   navigate('/')
    // })
  }

  return (
    <Page>
      <LoginForm onSubmit={handleLogin} />
    </Page>
  )
}
