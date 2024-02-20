import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextField, Textfield } from '@/components/ui/text-field/text-field'

type ControlledTextfieldProps<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'defaultValue' | 'rules'
> &
  Omit<Textfield, 'onChange' | 'value'>
export const ControlledTextfield = <T extends FieldValues>({
  control,
  shouldUnregister,
  ...rest
}: ControlledTextfieldProps<T>) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    disabled: rest.disabled,
    name: rest.name,
    shouldUnregister,
  })

  return <TextField {...rest} defaultValue={''} onChange={onChange} value={value} />
}
