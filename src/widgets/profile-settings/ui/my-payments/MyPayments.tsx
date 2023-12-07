import React from 'react'

import { useRouter } from 'next/router'

import { useMyPaymentsQuery } from '@/entities/subscription/subscriptionApi'
import { Typography } from '@/shared/ui'
import { Body, Cell, Head, HeadCell, Root, Row } from '@/shared/ui/table'
import { getNumericDayMonthTime } from '@/shared/utils'

export const MyPayments = () => {
  const { data: myPaymentsData } = useMyPaymentsQuery()
  const { locale } = useRouter()

  const headOptions = [
    'Date of Payment',
    'End date of subscription',
    'Price',
    'Subscription Type',
    'Payment Type',
  ]

  const headTable = headOptions.map((option, index) => (
    <HeadCell key={index}>
      <Typography variant={'bold14'}>{option}</Typography>
    </HeadCell>
  ))

  const paymentsTableData = myPaymentsData?.map(payment => {
    const dateOfPaymentCell = getNumericDayMonthTime(payment.dateOfPayment, locale as string)

    const endDateOfSubscriptionCell = getNumericDayMonthTime(
      payment.endDateOfSubscription,
      locale as string
    )

    return (
      <Row key={payment.subscriptionId}>
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
          <Typography variant={'small'}>{payment.paymentType}</Typography>
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
    </div>
  )
}
