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

  //Расчет максимальной даты
  const today = new Date()
  const minBirthday = new Date(1910, 0, 1, 0, 0, 0, 0)
  const maxBirthday = new Date()

  maxBirthday.setFullYear(today.getFullYear() - 13)
  maxBirthday.setDate(today.getDate() - 1)

  return z.object({
    userName: userNameZod,
    firstName: firstLastNameZod,
    lastName: firstLastNameZod,
    city: z.string(),
    dateOfBirth: z
      .date()
      .min(minBirthday, t.myProfile.generalInformation.ageMinDateError)
      .max(maxBirthday, t.myProfile.generalInformation.ageMaxDateError),
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
    reset,
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

  const disableButton = isDirty || !isValid

  const onSubmit = (data: UpdateProfileFormShem) => {
    updateProfile(data)
      .unwrap()
      .then(() => {
        toast.success(t.toast.success)
        reset(data)
      })
  }

  const handleSubmitForm = handleSubmit(onSubmit)

  return { handleSubmitForm, control, errors, disableButton }
}
