import React from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useUpdateProfileMutation } from '@/entities/profile/api/profile-api'
import { Button, ControlledTextField, Typography } from '@/shared'
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
  dateOfBirth: z
    .date()
    .min(new Date('01-01-1910Z'))
    .max(
      new Date(Date.now() - 13 * 365 * 24 * 60 * 60 * 1000),
      'A user under 13 cannot create a profile'
    ),
  aboutMe: z.string().min(0).max(200),
})

export type UpdateProfileFormShem = z.infer<typeof updateProfileSchema>

export const UpdateProfileForm = () => {
  const [updateProfile] = useUpdateProfileMutation()
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<UpdateProfileFormShem>({
    defaultValues: {
      userName: '',
      firstName: '',
      lastName: '',
      dateOfBirth: new Date(Date.now() - 13 * 365 * 24 * 60 * 60 * 1000),
      city: 'Minsk',
      aboutMe: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(updateProfileSchema),
  })

  const onSubmit = (data: UpdateProfileFormShem) => {
    debugger
    updateProfile(data)
  }

  const handleSubmitForm = handleSubmit(onSubmit)

  return (
    <form onSubmit={handleSubmitForm}>
      <DevTool control={control} />
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
      <DatePicker
        control={control}
        name={'dateOfBirth'}
        title={'Date of birth'}
        error={errors.dateOfBirth}
      />
      <ControlledTextField
        // className={s.userName}
        control={control}
        type={'default'}
        name={'city'}
        label={'City'}
        placeholder={'enter your city'}
      />
      <ControlledTextArea
        name={'aboutMe'}
        control={control}
        label={'About Me'}
        placeholder={'tell us about yourself'}
      />
      <Button disabled={!isValid} type={'submit'}>
        <Typography variant={'h3'}>Save Changes</Typography>
      </Button>
    </form>
  )
}
