import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button/button'
import { TextField } from '@/components/ui/text-field/text-field'

type FormValues = {
  email: string
  password: string
}

export const LoginForm = () => {
  const { handleSubmit, register } = useForm<FormValues>()

  console.log(register('email'))
  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField {...register('email')} label={'email'} type={'email'} />
      <TextField {...register('password')} label={'password'} type={'password'} />
      <Button type={'submit'}>Submit</Button>
    </form>
  )
}
