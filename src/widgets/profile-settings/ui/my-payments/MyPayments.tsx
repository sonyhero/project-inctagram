import React from 'react'

import { useRouter } from 'next/router'

import s from './MyPayments.module.scss'

import { useMyPaymentsQuery } from '@/entities/subscription/api/subscriptionApi'
import { setCurrentPage, setPageSize } from '@/entities/subscription/model/subscriptionSlice'
import { useTranslation } from '@/shared/hooks'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { Pagination, Typography } from '@/shared/ui'
import { SelectBox } from '@/shared/ui/select/SelectBox'
import { Body, Cell, Head, HeadCell, Root, Row } from '@/shared/ui/table'
import { comparePaymentDates, getNumericDayMonthTime } from '@/shared/utils'

export const MyPayments = () => {
  const { data: myPaymentsData } = useMyPaymentsQuery()
  const { locale } = useRouter()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const paginationOptions = useAppSelector(state => state.subscriptionSlice.paginationOptions)
  const currentPage = useAppSelector(state => state.subscriptionSlice.currentPage)
  const pageSize = useAppSelector(state => state.subscriptionSlice.pageSize)

  const pagesCount = myPaymentsData ? Math.ceil(myPaymentsData.length / pageSize) : 0

  const sortedPaymentsData = myPaymentsData && [...myPaymentsData].sort(comparePaymentDates)

  const getPageData = (pageNumber: number) => {
    const startIndex = (pageNumber - 1) * pageSize
    const endIndex = startIndex + pageSize

    return sortedPaymentsData?.slice(startIndex, endIndex)
  }

  const pageData = getPageData(currentPage)

  const headOptions = [
    t.myProfile.myPayments.table.dateOfPayment,
    t.myProfile.myPayments.table.endOfSubscriptions,
    t.myProfile.myPayments.table.price,
    t.myProfile.myPayments.table.subscriptionType,
    t.myProfile.myPayments.table.paymentType,
  ]

  const onSetPerPage = (value: number) => {
    dispatch(setPageSize(value))
  }

  const onSetCurrentPage = (value: number) => {
    dispatch(setCurrentPage(value))
  }

  const headTable = headOptions.map((option, index) => (
    <HeadCell key={index}>
      <Typography variant={'bold14'}>{option}</Typography>
    </HeadCell>
  ))

  const paymentsTableData = pageData?.map((payment, index) => {
    const dateOfPaymentCell = getNumericDayMonthTime(payment.dateOfPayment, locale as string)

    const endDateOfSubscriptionCell = getNumericDayMonthTime(
      payment.endDateOfSubscription,
      locale as string
    )

    return (
      <Row key={index}>
        <Cell>
          <Typography variant={'regular14'}>{dateOfPaymentCell}</Typography>
        </Cell>
        <Cell>
          <Typography variant={'regular14'}>{endDateOfSubscriptionCell}</Typography>
        </Cell>
        <Cell>
          <Typography variant={'regular14'}>${payment.price}</Typography>
        </Cell>
        <Cell>
          <Typography variant={'regular14'}>{payment.subscriptionType}</Typography>
        </Cell>
        <Cell>
          <Typography variant={'regular14'}>{payment.paymentType}</Typography>
        </Cell>
      </Row>
    )
  })

  return (
    <div>
      <Root>
        <Head>
          <Row>{headTable}</Row>
        </Head>
        <Body>{paymentsTableData}</Body>
      </Root>
      <div className={s.pagination}>
        <Pagination count={pagesCount} page={currentPage} onChange={onSetCurrentPage} />
        <Typography variant={'regular14'}>
          {t.myProfile.myPayments.paginationSelect.show}
        </Typography>
        <SelectBox
          defaultValue={paginationOptions[0].value}
          options={paginationOptions}
          onValueChange={onSetPerPage}
          className={s.selectPagination}
        />
        <Typography variant={'regular14'}>
          {t.myProfile.myPayments.paginationSelect.onPage}
        </Typography>
      </div>
    </div>
  )
}
