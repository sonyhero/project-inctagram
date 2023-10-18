import { FC, ReactNode } from 'react'

import * as Select from '@radix-ui/react-select'
import { Control, Controller, FieldError } from 'react-hook-form'

import s from './select.module.scss'

import { ArrowIosDown, Typography } from '@/shared/ui'

export type SelectPropsType = {
  label?: string
  control?: Control<any>
  placeholder?: ReactNode
  value?: any
  onValueChange?: (value: any) => void
  defaultValue?: any
  options: any[]
  disabled?: boolean
  required?: boolean
  classname?: string
  errorMessage?: FieldError
  name?: string
}

export const SelectBox: FC<SelectPropsType> = ({
  name,
  label,
  placeholder,
  value,
  onValueChange,
  control,
  defaultValue,
  options,
  disabled,
  required,
  classname,
  errorMessage,
}) => {
  return (
    <Controller
      control={control}
      name={name ?? ''}
      render={({ field: { onChange } }) => {
        return (
          <Typography variant={'regular14'} as={'label'} color={'secondary'}>
            {label}

            <Select.Root
              defaultValue={defaultValue}
              value={value}
              onValueChange={onChange}
              disabled={disabled}
              required={required}
            >
              <Select.Trigger
                className={`${disabled ? s.triggerDisabled : s.trigger} ${classname}`}
                asChild
                aria-label={'select'}
                tabIndex={1}
              >
                <div>
                  <Select.Value placeholder={placeholder} />
                  <ArrowIosDown className={disabled ? s.iconDisabled : s.icon} />
                </div>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content position={'popper'} className={s.content} sideOffset={-1}>
                  <Select.Viewport>
                    {options.map(el => (
                      <Select.Item key={el.value} value={el.value} className={s.item}>
                        <Select.ItemText>{el.value}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
            <Typography variant={'regular16'} color={'error'}>
              {errorMessage?.message}
            </Typography>
          </Typography>
        )
      }}
    />
  )
}
