import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { GetProfileResponse, useUpdateProfileMutation } from '@/entities/profile'
import { FIRST_LAST_NAME_REGEX, USER_NAME_REGEX } from '@/shared/config/regex'
import { getZodSchema } from '@/shared/config/zodSchemas'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { LocaleType } from '@/shared/locales'

const getUpdateProfileSchema = (t: LocaleType) => {
  const userNameZod = getZodSchema({
    t,
    lengthMin: 6,
    lengthMax: 30,
    regex: USER_NAME_REGEX,
    regexMessage: t.zodSchema.userNameRegex,
  })

  const firstLastNameZod = getZodSchema({
    t,
    lengthMin: 1,
    lengthMax: 50,
    regex: FIRST_LAST_NAME_REGEX,
    regexMessage: t.zodSchema.firstLastNameRegex,
  })

  return z.object({
    userName: userNameZod,
    firstName: firstLastNameZod,
    lastName: firstLastNameZod,
    city: z.string(),
    dateOfBirth: z
      .date()
      .min(new Date('01-01-1910Z'))
      .max(
        new Date(Date.now() - 13 * 365 * 24 * 60 * 60 * 1000),
        t.myProfile.generalInformation.ageDateError
      ),
    aboutMe: z.string().min(0).max(200, `${t.zodSchema.maxNumberOfCharacters} 200`),
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

  const [dirty, setDirty] = useState(isDirty)

  const onSubmit = (data: UpdateProfileFormShem) => {
    updateProfile(data)
      .unwrap()
      .then(() => {
        toast.success(t.toast.success)
        setDirty(false)
      })
  }

  const handleSubmitForm = handleSubmit(onSubmit)
  const handleChangeForm = () => {
    setDirty(true)
  }

  return { handleSubmitForm, control, errors, isValid, dirty, handleChangeForm }
}
