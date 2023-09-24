import { FC, ReactNode } from 'react'

import * as Select from '@radix-ui/react-select'

import { Typography } from '../typography'

import s from './select-box.module.scss'

import { ArrowIosDown } from '@/shared/ui/icons'

// import { SelectArrow } from '@/assets'

export type SelectPropsType = {
  label?: string
  placeholder?: ReactNode
  value?: string
  onValueChange?: (value: any) => void
  defaultValue?: any
  options: any[]
  disabled?: boolean
  required?: boolean
  classname?: string
}

export const SelectBox: FC<SelectPropsType> = ({
  label,
  placeholder,
  value,
  onValueChange,
  defaultValue,
  options,
  disabled,
  required,
  classname,
}) => (
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
        tabIndex={1}
      >
        <div>
          <Select.Value className={s.selectValue} placeholder={placeholder} />
          <ArrowIosDown className={disabled ? s.iconDisabled : s.icon} />
        </div>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content position={'popper'} className={s.content} sideOffset={-1}>
          <Select.Viewport>
            {options.map((el, index) => (
              <Select.Item key={index} value={el.value} className={s.item}>
                {el.img ? (
                  <Select.ItemText>
                    <div className={s.langSwitcher}>
                      {el.img}
                      {el.value}
                    </div>
                  </Select.ItemText>
                ) : (
                  <Select.ItemText>{el.value}</Select.ItemText>
                )}
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  </Typography>
)
