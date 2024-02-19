import { useEffect, useRef } from 'react'
import { useController, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button/button'
import { FormCheckbox } from '@/components/ui/checkbox/checkbox'
import { TextField } from '@/components/ui/text-field/text-field'

type FormValues = {
  email: string
  password: string
  rememberMe: boolean
}

export const LoginForm = () => {
  const formRef = useRef(null)
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>()

  const {
    field: { onChange, value },
  } = useController({ control, defaultValue: false, name: 'rememberMe' })

  useEffect(() => {
    console.log(formRef.current)
  }, [])
  console.log(errors)
  // console.log(register('email'))
  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
      <TextField
        errorMessage={errors.email?.message}
        {...register('email', {
          pattern: { message: 'Invalid email', value: emailRegex },
          required: 'The email should be',
        })}
        label={'email'}
        type={'email'}
      />
      <TextField
        errorMessage={errors.password?.message}
        {...register('password', {
          minLength: { message: 'Password has to be at least 3 characters long', value: 3 },
          required: 'The password should be',
        })}
        label={'password'}
        type={'password'}
      />
      <FormCheckbox
        checked={value}
        onValueChange={onChange}
        {...register('rememberMe')}
        label={'Remember me'}
      />
      <Button type={'submit'}>Submit</Button>
    </form>
  )
}

const emailRegex =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
