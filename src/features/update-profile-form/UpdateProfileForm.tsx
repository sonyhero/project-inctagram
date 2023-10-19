import React from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './UpdateProfileForm.module.scss'

import { useUpdateProfileMutation } from '@/entities/profile'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import {
  Button,
  ControlledTextArea,
  ControlledTextField,
  DatePicker,
  SelectBox,
  Typography,
} from '@/shared/ui'

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
      dateOfBirth: new Date(),
      city: '',
      aboutMe: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(updateProfileSchema),
  })

  const { t } = useTranslation()

  const cities = [
    { id: '1', value: t.myProfile.generalInformation.cities.minsk },
    { id: '2', value: t.myProfile.generalInformation.cities.grodno },
    { id: '3', value: t.myProfile.generalInformation.cities.brest },
  ]

  const onSubmit = (data: UpdateProfileFormShem) => {
    updateProfile(data)
  }

  const handleSubmitForm = handleSubmit(onSubmit)

  return (
    <form onSubmit={handleSubmitForm} className={s.updateProfileBlock}>
      <DevTool control={control} />
      <ControlledTextField
        className={errors.userName ? '' : s.errorField}
        control={control}
        type={'default'}
        name={'userName'}
        label={t.myProfile.generalInformation.userName}
        placeholder={t.myProfile.generalInformation.placeholderUserName}
      />
      <ControlledTextField
        className={errors.firstName ? '' : s.errorField}
        control={control}
        type={'default'}
        name={'firstName'}
        label={t.myProfile.generalInformation.firstName}
        placeholder={t.myProfile.generalInformation.placeholderFirstName}
      />
      <ControlledTextField
        className={errors.lastName ? '' : s.errorField}
        control={control}
        type={'default'}
        name={'lastName'}
        label={t.myProfile.generalInformation.lastName}
        placeholder={t.myProfile.generalInformation.placeholderLastName}
      />
      <DatePicker
        className={errors.dateOfBirth ? '' : s.errorField}
        control={control}
        name={'dateOfBirth'}
        title={t.myProfile.generalInformation.dateOfBirth}
        error={errors.dateOfBirth}
      />
      <SelectBox
        classname={s.field}
        name={'city'}
        options={cities}
        control={control}
        label={t.myProfile.generalInformation.selectYourCity}
        errorMessage={errors.city}
        placeholder={t.myProfile.generalInformation.placeholderCity}
      />
      <ControlledTextArea
        name={'aboutMe'}
        control={control}
        label={t.myProfile.generalInformation.aboutMe}
        placeholder={t.myProfile.generalInformation.placeholderAboutMe}
      />
      <Button disabled={!isValid} type={'submit'} className={s.saveChanges}>
        <Typography variant={'h3'}>{t.myProfile.generalInformation.saveChanges}</Typography>
      </Button>
    </form>
  )
}
