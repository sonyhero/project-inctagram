import { ReactNode, useMemo } from 'react'

import { ReactDatePickerCustomHeaderProps } from 'react-datepicker'

import s from './DatePickerHeader.module.scss'

import { useTranslation } from '@/shared/hooks/useTranstaion'
import { ArrowIosBack, ArrowIosForward } from '@/shared/ui'

export const DatePickerHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: Partial<ReactDatePickerCustomHeaderProps>): ReactNode => {
  const currentMonth = date?.getMonth() as number
  const currentYear = date?.getFullYear()
  const { t } = useTranslation()

  const mapMonthIndexToName: Record<number, string> = useMemo(() => {
    return {
      0: t.myProfile.generalInformation.month.jan,
      1: t.myProfile.generalInformation.month.feb,
      2: t.myProfile.generalInformation.month.mar,
      3: t.myProfile.generalInformation.month.apr,
      4: t.myProfile.generalInformation.month.may,
      5: t.myProfile.generalInformation.month.jun,
      6: t.myProfile.generalInformation.month.jul,
      7: t.myProfile.generalInformation.month.aug,
      8: t.myProfile.generalInformation.month.sep,
      9: t.myProfile.generalInformation.month.oct,
      10: t.myProfile.generalInformation.month.nov,
      11: t.myProfile.generalInformation.month.dec,
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
