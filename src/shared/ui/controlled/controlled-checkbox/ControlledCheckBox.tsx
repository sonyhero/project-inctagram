import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { CheckBox, CheckBoxProps } from '@/shared/ui'

type Props<TFieldValues extends FieldValues> = UseControllerProps<TFieldValues> &
  Omit<CheckBoxProps, 'onChange' | 'value' | 'id'>

export const ControlledCheckBox = <TFieldValues extends FieldValues>(
  props: Props<TFieldValues>
) => {
  const { name, rules, shouldUnregister, control, defaultValue, ...checkboxProps } = props

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
