import { ComponentPropsWithoutRef, forwardRef } from 'react'

import clsx from 'clsx'

import s from './TextArea.module.scss'

import { Typography } from '@/shared/ui'

export type TextAreaProps = {
  label?: string
  fullWidth?: boolean
  className?: string
  errorMessage?: string
  placeholder?: string
  disabled?: boolean
} & ComponentPropsWithoutRef<'textarea'>

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const { label, fullWidth, className, errorMessage, placeholder, disabled, ...rest } = props

  const classNames = {
    textAreaContainer: clsx(className, s.container),
    label: clsx(s.label, disabled && s.disabled),
    textArea: clsx(s.textarea, errorMessage && s.error, fullWidth && s.fullWidth),
  }

  return (
    <div className={classNames.textAreaContainer}>
      <Typography variant="regular14" color="secondary" className={classNames.label}>
        {label}
      </Typography>
      <textarea
        placeholder={placeholder}
        className={classNames.textArea}
        disabled={disabled}
        {...rest}
        ref={ref}
      />
      <Typography variant="regular14" color="error" className={s.errorMessage}>
        {errorMessage}
      </Typography>
    </div>
  )
})
