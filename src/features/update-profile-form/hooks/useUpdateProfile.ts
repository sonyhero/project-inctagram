import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { GetProfileResponse, useUpdateProfileMutation } from '@/entities/profile'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { LocaleType } from '@/shared/locales'

const getUpdateProfileSchema = (t: LocaleType) => {
  // TODO вставить t в z.object для локализации ошибок при заполнении полей
  return z.object({
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
}

export type UpdateProfileFormShem = z.infer<ReturnType<typeof getUpdateProfileSchema>>

export const useUpdateProfile = (defaultValue: GetProfileResponse | undefined) => {
  const [updateProfile] = useUpdateProfileMutation()
  const { t } = useTranslation()
  const updateProfileSchema = getUpdateProfileSchema(t)

  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty, errors },
  } = useForm<UpdateProfileFormShem>({
    defaultValues: {
      userName: defaultValue?.userName ?? '',
      firstName: defaultValue?.firstName ?? '',
      lastName: defaultValue?.lastName ?? '',
      dateOfBirth: new Date(defaultValue?.dateOfBirth ?? ''),
      city: defaultValue?.city ?? '',
      aboutMe: defaultValue?.aboutMe ?? '',
    },
    mode: 'onBlur',
    resolver: zodResolver(updateProfileSchema),
  })

  const onSubmit = (data: UpdateProfileFormShem) => {
    updateProfile(data)
  }

  const handleSubmitForm = handleSubmit(onSubmit)

  return { handleSubmitForm, control, errors, isValid, isDirty }
}
