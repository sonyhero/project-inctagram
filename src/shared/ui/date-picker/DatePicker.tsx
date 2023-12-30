import { useLayoutEffect, useState } from 'react'

import { ru } from 'date-fns/locale'
import Link from 'next/link'
import { useRouter } from 'next/router'
import DatePickerInstance from 'react-datepicker'
import { Control, Controller, FieldError } from 'react-hook-form'

import calendarDefault from '../icons/calendar/calendar-default.svg'
import calendarError from '../icons/calendar/calendar-error.svg'

import s from './DatePicker.module.scss'
import { DatePickerHeader } from './DatePickerHeader'

import { PATH } from '@/shared/config/routes'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { Nullable } from '@/shared/types'
import { Typography } from '@/shared/ui'
import { customizeDatePickerInput } from '@/shared/utils/customizeDatePickerInput'

type Props = {
  control: Control<any>
  className?: string
  requiredField?: boolean
  name: string
  error?: FieldError
  title?: string
  range?: boolean
  max?: boolean
  width?: number
  placeholder?: string | Date
}

type Value = Nullable<Date>
type RangeValue = [Value, Value]

export const DatePicker = (props: Props) => {
  const { className, max, width, range, error, control, name, title, placeholder, requiredField } =
    props
  const [startDate, setStartDate] = useState<Value>(placeholder ? new Date(placeholder) : null)
  const [endDate, setEndDate] = useState<Value>(null)
  const { t } = useTranslation()
  const { locale } = useRouter()

  useLayoutEffect(() => {
    customizeDatePickerInput({
      calendarDefault,
      calendarError,
      max,
      width,
      error,
      name,
    })
  }, [max, width, error, name])

  const placeholderText = range
    ? `${t.myProfile.generalInformation.placeholderDateOfBirth} - ${t.myProfile.generalInformation.placeholderDateOfBirth}`
    : t.myProfile.generalInformation.placeholderDateOfBirth

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur } }) => {
        const handleChange = (value: Value | RangeValue) => {
          if (value instanceof Array) {
            const [start, end] = value

            setStartDate(start)
            setEndDate(end)
          } else {
            setStartDate(value)
          }

          onChange(value)
        }

        const birthdayError = (
          <>
            {error?.message}.{' '}
            <Link className={s.birthdayErrorLink} href={PATH.POLICY} target="_blank">
              {t.auth.signUp.privacyPolicy}
            </Link>
          </>
        )

        return (
          <div className={`${s.datePickerField} ${className}`}>
            <label htmlFor={name} className={s.label}>
              {title}
              {requiredField && (
                <Typography as={'span'} color={'error'}>
                  *
                </Typography>
              )}
            </label>
            <DatePickerInstance
              renderCustomHeader={params => <DatePickerHeader {...params} />}
              selected={startDate}
              onChange={handleChange}
              onBlur={onBlur}
              selectsRange={range}
              locale={locale === 'ru' ? ru : ''}
              startDate={range ? startDate : undefined}
              endDate={range ? endDate : undefined}
              placeholderText={placeholderText}
              dateFormat="dd.MM.yyyy"
            />
            {error && (
              <span className={s.datePickerError}>
                {error.type == 'too_big' ? birthdayError : error.message}
              </span>
            )}
          </div>
        )
      }}
    />
  )
}
