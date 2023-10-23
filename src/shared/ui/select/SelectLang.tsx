import { FC, ReactNode } from 'react'

import * as Select from '@radix-ui/react-select'

import s from './SelectBox.module.scss'

import { Typography } from '@/shared/ui'
import { ArrowIosDown } from '@/shared/ui/icons'

export type SelectLangPropsType = {
  label?: string
  placeholder?: ReactNode
  value?: any
  onValueChange?: (value: any) => void
  defaultValue?: any
  options: any[]
  disabled?: boolean
  required?: boolean
  classname?: string
}

export const SelectLang: FC<SelectLangPropsType> = ({
  label,
  placeholder,
  value,
  onValueChange,
  defaultValue,
  options,
  disabled,
  required,
  classname,
}) => {
  const onChangeHandler = (newValue: string) => {
    onValueChange?.(newValue)
  }

  return (
    <Typography variant={'regular14'} as={'label'} color={'secondary'}>
      {label}

      <Select.Root
        defaultValue={defaultValue}
        value={value}
        onValueChange={onChangeHandler}
        disabled={disabled}
        required={required}
      >
        <Select.Trigger
          className={`${disabled ? s.triggerDisabled : s.trigger} ${classname}`}
          asChild
          tabIndex={1}
        >
          <div>
            <Select.Value placeholder={placeholder}>
              {value?.img}
              <Typography>{value.value}</Typography>
            </Select.Value>
            <ArrowIosDown className={disabled ? s.iconDisabled : s.icon} />
          </div>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content position={'popper'} className={s.content} sideOffset={-1}>
            <Select.Viewport>
              {options.map(el => (
                <Select.Item key={el.id} value={el.id} className={s.item}>
                  {el?.img}
                  <Typography>{el.value}</Typography>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </Typography>
  )
}
