import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { FormCheckbox, FormCheckboxT } from '@/components/ui/checkbox/checkbox'

type ControlledCheckboxProps<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'defaultValue' | 'rules'
> &
  Omit<FormCheckboxT, 'checked' | 'onValueChange'>
// type ControlledCheckboxProps = {
//   control: any
//   name: string
// } & Omit<FormCheckboxT, 'name'>
export const ControlledCheckbox = <T extends FieldValues>({
  control,
  shouldUnregister,
  ...rest
}: ControlledCheckboxProps<T>) => {
  const {
    field: { onChange, value },
  } = useController({ control, disabled: rest.disabled, name: rest.name, shouldUnregister })

  return <FormCheckbox {...rest} checked={value} onValueChange={onChange} />
}
