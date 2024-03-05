import { useRef } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button/button'
import { ControlledCheckbox } from '@/components/ui/controlled/controlled-checkbox/controlled-checkbox'
import { TextField } from '@/components/ui/text-field/text-field'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('It is not valid bitch'),
  password: z.string().min(3),
  rememberMe: z.boolean().optional(),
})

type FormValues = z.infer<typeof loginSchema>

// type FormValues = {
//   email: string
//   password: string
//   rememberMe: boolean
// }

type LoginFormProps = {
  onSubmit: (data: FormValues) => void
}
export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const formRef = useRef(null)
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    resolver: zodResolver(loginSchema),
  })

  // const {
  //   field: { onChange, value },
  // } = useController({ control, defaultValue: false, name: 'rememberMe' })

  const onSubmitHandler = (data: FormValues) => {
    console.log(data)
    onSubmit(data)
  }

  return (
    <>
      {process.env.NODE_ENV === 'development' && <DevTool control={control} />}
      {/*<DevTool control={control} />*/}
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '100px',
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          ref={formRef}
          style={{
            border: '1px solid white',
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
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
          {/*<ControlledTextfield*/}
          {/*  control={control}*/}
          {/*  errorMessage={errors.phone?.message}*/}
          {/*  label={'phone'}*/}
          {/*  name={}*/}
          {/*  type={'text'}*/}
          {/*/>*/}

          {/*<FormCheckbox*/}
          {/*  checked={value}*/}
          {/*  // name={'remeberMe'}*/}
          {/*  label={'Remember me'}*/}
          {/*  //{...register('rememberMe')}*/}
          {/*  onValueChange={onChange}*/}
          {/*/>*/}

          <ControlledCheckbox control={control} label={'Remember me'} name={'rememberMe'} />
          <Button type={'submit'}>Submit</Button>
        </form>
      </div>
    </>
  )
}

// const emailRegex =
//   /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
