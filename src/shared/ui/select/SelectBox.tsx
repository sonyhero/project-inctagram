import { ReactNode } from 'react'

import * as Select from '@radix-ui/react-select'
import { clsx } from 'clsx'
import { FieldError } from 'react-hook-form'

import s from './SelectBox.module.scss'

import { ArrowIosDown, Typography } from '@/shared/ui'

export type SelectBoxProps = {
  label?: string
  placeholder?: ReactNode
  value?: any
  onValueChange?: (value: any) => void
  defaultValue?: any
  options: any[]
  disabled?: boolean
  required?: boolean
  classname?: string
  errorMessage?: FieldError
  height?: boolean
  idValue?: boolean
}

export const SelectBox = (props: SelectBoxProps) => {
  const {
    label,
    placeholder,
    value,
    onValueChange,
    defaultValue,
    options,
    disabled,
    required,
    classname,
    errorMessage,
    height,
    idValue = false,
  } = props

  return (
    <Typography variant={'regular14'} as={'label'} color={'secondary'}>
      {label}

      <Select.Root
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
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
            {value ? (
              <Select.Value placeholder={placeholder}>
                {value.img && value.img}
                {value.description && <Typography>{value.description}</Typography>}
              </Select.Value>
            ) : (
              <Select.Value placeholder={placeholder} />
            )}
            <ArrowIosDown className={disabled ? s.iconDisabled : s.icon} />
          </div>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            position={'popper'}
            className={clsx(s.content, { [s.height]: height })}
            sideOffset={-1}
          >
            <Select.Viewport>
              {options.map(el => (
                <Select.Item key={el.value} value={idValue ? el.id : el.value} className={s.item}>
                  {el?.img}
                  <Select.ItemText>{el.description ?? el.value}</Select.ItemText>
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
}
