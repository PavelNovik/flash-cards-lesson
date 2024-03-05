import { useNavigate } from 'react-router-dom'
import { Bounce, toast } from 'react-toastify'

import { LoginForm } from '@/components/auth/login-form/login-form'
import { Page } from '@/components/ui/page/page'
import { useLoginMutation } from '@/services/auth/auth.service'
import { LoginArgs } from '@/services/auth/auth.types'

export const LoginPage = () => {
  const [login] = useLoginMutation()
  const navigate = useNavigate()

  const handleLogin = (data: LoginArgs) => {
    login(data)
      .unwrap()
      .then(() => {
        navigate('/')
        toast.success('🦄 Wow so easy!', {
          autoClose: 5000,
          closeOnClick: true,
          draggable: true,
          hideProgressBar: false,
          pauseOnHover: true,
          position: 'top-right',
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        })
      })
  }

  return (
    <Page>
      <LoginForm onSubmit={handleLogin} />
    </Page>
  )
}
