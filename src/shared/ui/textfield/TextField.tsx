import { ChangeEvent, KeyboardEvent, ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { Typography } from '../typography'

import s from './TextField.module.scss'

import { Close, Eye, EyeOff, Search } from '@/shared/ui/icons'

export type TextFieldProps = {
  type: 'default' | 'password' | 'searchType'
  label?: string
  errorMessage?: string
  placeholder?: string
  disableValue?: boolean
  value?: string
  onChangeText?: (value: string) => void
  onEnter?: () => void
  onSearchClear?: () => void
  className?: string
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const {
    errorMessage,
    label,
    placeholder = 'Some text',
    type = 'default',
    disableValue = false,
    value,
    onEnter,
    onSearchClear,
    onChangeText,
    className,
    ...restProps
  } = props
  const [showPassword, setShowPassword] = useState(false)

  const finalType = getType(type, showPassword)

  const inputStyle = (type: 'default' | 'password' | 'searchType') => {
    if (type === 'searchType') {
      return { paddingLeft: '2.56rem', paddingRight: '35px' }
    } else if (type === 'password') {
      return { paddingRight: '35px' }
    } else {
      return {}
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeText?.(e.currentTarget.value)
  }

  const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
    onEnter && e.key === 'Enter' && onEnter()
  }
  const onSearchClearHandler = () => {
    if (onSearchClear) {
      onSearchClear()
    }
  }

  return (
    <div className={className}>
      <Typography as={'label'} color={disableValue ? 'disabled' : 'secondary'}>
        {label}
        <div className={`${s.fieldContainer}`}>
          {type === 'searchType' && (
            <Search className={disableValue ? s.searchDisabled : s.search}></Search>
          )}
          <input
            className={`${s.field} ${errorMessage ? s.error : ''}`}
            placeholder={placeholder}
            type={finalType}
            disabled={disableValue}
            onChange={onChangeHandler}
            onKeyDown={onKeyPressCallback}
            ref={ref}
            style={inputStyle(type)}
            value={value}
            {...restProps}
          />
          {type === 'password' && (
            <button
              className={s.buttonAction}
              type={'button'}
              disabled={disableValue}
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? (
                <Eye fill={disableValue ? '#4c4c4c' : '#fff'} />
              ) : (
                <EyeOff fill={disableValue ? '#4c4c4c' : '#fff'} />
              )}
            </button>
          )}
          {type === 'searchType' && !!value && (
            <button
              className={s.buttonAction}
              type={'button'}
              disabled={disableValue}
              onClick={onSearchClearHandler}
            >
              <Close fill={disableValue ? '#4c4c4c' : '#808080'} />
            </button>
          )}
        </div>
        <Typography variant={'regular16'} color={'error'}>
          {errorMessage}
        </Typography>
      </Typography>
    </div>
  )
})

function getType(type: string, showPassword: boolean) {
  if (type === 'password' && showPassword) {
    return 'text'
  }

  return type
}
