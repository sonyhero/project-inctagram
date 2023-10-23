import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { CheckBox, CheckBoxProps } from '@/shared/ui'

export type ControlledCheckboxProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> & Omit<CheckBoxProps, 'onChange' | 'value' | 'id'>

export const ControlledCheckBox = <TFieldValues extends FieldValues>({
  name,
  rules,
  shouldUnregister,
  control,
  defaultValue,
  ...checkboxProps
}: ControlledCheckboxProps<TFieldValues>) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    rules,
    shouldUnregister,
    control,
    defaultValue,
  })

  return (
    <CheckBox
      {...{
        onChange,
        checked: value,
        id: name,
        ...checkboxProps,
      }}
    />
  )
}
