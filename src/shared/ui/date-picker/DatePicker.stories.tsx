import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { DatePicker } from '@/shared/ui/date-picker/DatePicker'

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

const generalInfoSchemaFn = z.object({
  birthday: z
    .date()
    .min(new Date('01-01-1910Z'))
    .max(
      new Date(Date.now() - 13 * 365 * 24 * 60 * 60 * 1000),
      'A user under 13 cannot create a profile'
    )
    .optional(),
})

export type TGeneralInfo = z.infer<typeof generalInfoSchemaFn>

export const DatePickerSingle: React.FC = () => {
  const { control } = useForm<TGeneralInfo>({ resolver: zodResolver(generalInfoSchemaFn) })

  return <DatePicker title="Date" name="birthday" control={control} max />
}

export const DatePickerSingleError: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useForm<TGeneralInfo>({ resolver: zodResolver(generalInfoSchemaFn) })

  return (
    <DatePicker
      title="Date"
      name="birthday"
      control={control}
      max
      error={{ type: 'too_big', message: 'A user under 13 cannot create a profile' }}
    />
  )
}

export const DatePickerRange: React.FC = () => {
  const { control } = useForm<TGeneralInfo>()

  return (
    <DatePicker title="Date range" range={true} width={300} name="birthday" control={control} />
  )
}
