import { ReactElement } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'

import s from './CheckBox.module.scss'

import { CheckIcon } from '@/shared/ui/icons/check-icon/CheckIcon'
import { Typography } from '@/shared/ui/typography'

export type CheckBoxProps = {
  onChange?: (checked: boolean) => void
  disabled?: boolean
  checked?: boolean
  label?: ReactElement | string
}

export const CheckBox = (props: CheckBoxProps) => {
  const { disabled = false, onChange, checked, label, ...rest } = props

  return (
    <Typography
      className={s.label}
      variant={'regular14'}
      as={'label'}
      color={disabled ? 'disabled' : 'primary'}
    >
      <Checkbox.Root
        className={`${s.checkboxRoot} ${checked ? s.active : s.unActive}`}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
        {...rest}
      >
        <Checkbox.Indicator className={s.checkboxIndicator}>
          <CheckIcon fill={disabled ? '#4c4c4c' : '#edf3fa'} />
        </Checkbox.Indicator>
      </Checkbox.Root>
      {label}
    </Typography>
  )
}
