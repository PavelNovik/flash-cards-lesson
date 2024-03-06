import { useForm } from 'react-hook-form'

import { Container } from '@/components/ui/container/container'
import { ControlledCheckbox } from '@/components/ui/controlled/controlled-checkbox/controlled-checkbox'
import { Dialog, DialogProps } from '@/components/ui/dialog/dialog'
import { TextField } from '@/components/ui/text-field/text-field'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const createDeckSchema = z.object({
  cover: z.string().optional().nullable(),
  isPrivate: z.boolean(),
  name: z.string().min(3).max(500),
})

type FormValue = z.infer<typeof createDeckSchema>

type DeckDialogProps = Pick<DialogProps, 'onCancel' | 'onOpenChange' | 'open'> & {
  defaultValues?: FormValue
  onConfirm: (data: FormValue) => void
}
export const DeckDialog = ({
  defaultValues = { cover: null, isPrivate: false, name: '' },
  onCancel,
  onConfirm,
  ...dialogProps
}: DeckDialogProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<FormValue>({
    defaultValues,
    resolver: zodResolver(createDeckSchema),
  })

  const onSubmit = handleSubmit(data => {
    onConfirm(data)
    dialogProps.onOpenChange?.(false)
    reset()
  })
  const handleCancel = () => {
    reset()
    onCancel?.()
  }

  return (
    <Dialog {...dialogProps} onCancel={handleCancel} onConfirm={onSubmit} title={'Create new Deck'}>
      <form onSubmit={onSubmit}>
        <Container style={{ flexDirection: 'column', gap: '10px' }}>
          <TextField
            errorMessage={errors.name?.message}
            {...register('name')}
            label={'Deck name'}
          />
          <TextField errorMessage={errors.cover?.message} {...register('cover')} label={'Cover'} />
          <ControlledCheckbox control={control} label={'Is private'} name={'isPrivate'} />
        </Container>
      </form>
    </Dialog>
  )
}
