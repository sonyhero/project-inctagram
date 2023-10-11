import { ReactNode, useMemo } from 'react'

import { ReactDatePickerCustomHeaderProps } from 'react-datepicker'

import s from './DatePickerHeader.module.scss'

import { ArrowIosBack, ArrowIosForward } from '@/shared'

export const DatePickerHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: Partial<ReactDatePickerCustomHeaderProps>): ReactNode => {
  const currentMonth = date?.getMonth() as number
  const currentYear = date?.getFullYear()

  const mapMonthIndexToName: Record<number, string> = useMemo(() => {
    return {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December',
    }
  }, [])

  return (
    <div className={s.datePickerHeader}>
      <span className={s.currentMonthAndYear}>
        {`${mapMonthIndexToName[currentMonth]} ${currentYear}`}
      </span>
      <button
        className={s.btn}
        type="button"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
      >
        <ArrowIosBack />
      </button>
      <button
        className={s.btn}
        type="button"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
      >
        <ArrowIosForward />
      </button>
    </div>
  )
}
