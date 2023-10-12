import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ControlledTextField } from '@/shared'
import { ControlledTextArea } from '@/shared/ui/controlled/controlled-textarea'
import { DatePicker } from '@/shared/ui/date-picker'

const updateProfileSchema = z.object({
  userName: z
    .string()
    .min(6)
    .max(30)
    .regex(/^[a-zA-Z0-9_-]*$/),
  firstName: z
    .string()
    .min(1)
    .max(50)
    .regex(/^[a-zA-Zа-яА-я]*$/),
  lastName: z
    .string()
    .min(1)
    .max(50)
    .regex(/^[a-zA-Zа-яА-я]*$/),
  city: z.string(),
  dateOfBirth: z.date(),
  aboutMe: z.string().min(0).max(200),
})

export type UpdateProfileFormShem = z.infer<typeof updateProfileSchema>

export const UpdateProfileForm = () => {
  const {
    control,
    handleSubmit,
    setError,
    watch,
    reset,
    formState: { isValid },
  } = useForm<UpdateProfileFormShem>({
    defaultValues: {},
    mode: 'onBlur',
    resolver: zodResolver(updateProfileSchema),
  })

  const onSubmit = (data: UpdateProfileFormShem) => {}

  const handleSubmitForm = handleSubmit(onSubmit)

  return (
    <form onSubmit={handleSubmitForm}>
      <ControlledTextField
        // className={s.userName}
        control={control}
        type={'default'}
        name={'userName'}
        label={'Username'}
        placeholder={'enter your username'}
      />
      <ControlledTextField
        // className={s.userName}
        control={control}
        type={'default'}
        name={'firstName'}
        label={'First Name'}
        placeholder={'enter your first name'}
      />
      <ControlledTextField
        // className={s.userName}
        control={control}
        type={'default'}
        name={'lastName'}
        label={'Last Name'}
        placeholder={'enter your last name'}
      />
      <DatePicker control={control} name={'dateOfBirth'} title={'Date of birth'} />
      {/*<SelectBox options={} />*/}
      <ControlledTextArea
        name={'aboutMe'}
        control={control}
        label={'About Me'}
        placeholder={'tell us about yourself'}
      />
    </form>
  )
}
