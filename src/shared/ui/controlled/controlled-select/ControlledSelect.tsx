import { Control, Controller } from 'react-hook-form'

import { SelectBox, SelectBoxProps } from '@/shared/ui/select/SelectBox'

type Props = SelectBoxProps & {
  control?: Control<any>
  name?: string
}

export const ControlledSelect = (props: Props) => {
  const { name, control, ...restProps } = props

  return (
    <Controller
      control={control}
      name={name ?? ''}
      render={({ field: { onChange } }) => {
        return <SelectBox {...restProps} onValueChange={onChange} />
      }}
    />
  )
}
