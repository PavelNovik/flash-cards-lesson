import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Container } from '@/components/ui/container/container'
import { ControlledCheckbox } from '@/components/ui/controlled/controlled-checkbox/controlled-checkbox'
import { Dialog, DialogProps } from '@/components/ui/dialog/dialog'
import { TextField } from '@/components/ui/text-field/text-field'
import { CreateDeckArgs } from '@/services/decks/decks.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const createDeckSchema = z.object({
  isPrivate: z.boolean(),
  name: z.string().min(3).max(500),
})

type FormValue = z.infer<typeof createDeckSchema>

type DeckDialogProps = Pick<DialogProps, 'onCancel' | 'onOpenChange' | 'open'> & {
  defaultValues?: CreateDeckArgs
  onConfirm: (data: CreateDeckArgs) => void
}
export const DeckDialog = ({
  defaultValues = { cover: null, isPrivate: false, name: '' },
  onCancel,
  onConfirm,
  ...dialogProps
}: DeckDialogProps) => {
  const [cover, setCover] = useState<File | null>(defaultValues?.cover ?? null)
  const ref = useRef<HTMLInputElement>(null)
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
    onConfirm({ ...data, cover })
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
          <label>
            Cover
            <input
              name={'cover'}
              onChange={e => setCover(e.currentTarget.files?.[0] ?? null)}
              ref={ref}
              type={'file'}
            />
          </label>
          <ControlledCheckbox control={control} label={'Is private'} name={'isPrivate'} />
        </Container>
      </form>
    </Dialog>
  )
}
