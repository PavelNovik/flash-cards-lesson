import { useEffect, useRef } from 'react'
import { useController, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button/button'
import { FormCheckbox } from '@/components/ui/checkbox/checkbox'
import { TextField } from '@/components/ui/text-field/text-field'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().min(1, 'To small bitch').email('It is not valid bitch'),
  password: z.string().min(3),
  rememberMe: z.boolean().optional(),
})

type FormValues = z.infer<typeof loginSchema>

// type FormValues = {
//   email: string
//   password: string
//   rememberMe: boolean
// }

export const LoginForm = () => {
  const formRef = useRef(null)
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({ resolver: zodResolver(loginSchema) })

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
        {...register('email')}
        label={'email'}
        type={'email'}
      />
      <TextField
        errorMessage={errors.password?.message}
        {...register('password')}
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

// const emailRegex =
//   /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
