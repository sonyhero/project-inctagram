import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { TextAreaField, TextAreaProps } from '@/shared/ui/textarea/TextArea'

export type ControlledTextAreaProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>
  control: Control<TFieldValues>
} & Omit<TextAreaProps, 'onChange' | 'value' | 'id'>

export const ControlledTextArea = <TFieldValues extends FieldValues>(
  props: ControlledTextAreaProps<TFieldValues>
) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: props.name,
    control: props.control,
  })

  return <TextAreaField {...props} {...field} errorMessage={error?.message} id={props.name} />
}