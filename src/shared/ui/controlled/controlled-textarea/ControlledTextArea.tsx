import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { TextAreaField, TextAreaProps } from '@/shared/ui/textarea/TextArea'

type Props<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>
  control: Control<TFieldValues>
} & Omit<TextAreaProps, 'onChange' | 'value' | 'id'>

export const ControlledTextArea = <TFieldValues extends FieldValues>({
  control,
  name,
  ...props
}: Props<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  return <TextAreaField {...props} {...field} errorMessage={error?.message} id={name} />
}
