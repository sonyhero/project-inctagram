import { DevTool } from '@hookform/devtools'

import s from './UpdateProfileForm.module.scss'

import { GetProfileResponse } from '@/entities/profile'
import { useUpdateProfile } from '@/features/update-profile-form/hooks/useUpdateProfile'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import {
  Button,
  ControlledSelect,
  ControlledTextArea,
  ControlledTextField,
  DatePicker,
} from '@/shared/ui'

type Props = {
  defaultValue?: GetProfileResponse
}

export const UpdateProfileForm = ({ defaultValue }: Props) => {
  const { t } = useTranslation()
  const { control, handleSubmitForm, errors, disableButton } = useUpdateProfile(defaultValue)

  const cities = [
    { id: '1', value: t.myProfile.generalInformation.cities.minsk },
    { id: '2', value: t.myProfile.generalInformation.cities.grodno },
    { id: '3', value: t.myProfile.generalInformation.cities.brest },
  ]

  return (
    <form onSubmit={handleSubmitForm} className={s.updateProfileBlock}>
      <DevTool control={control} />
      <ControlledTextField
        className={errors.userName ? '' : s.errorField}
        control={control}
        type={'default'}
        name={'userName'}
        requiredField
        label={t.myProfile.generalInformation.userName}
        placeholder={t.myProfile.generalInformation.placeholderUserName}
      />
      <ControlledTextField
        className={errors.firstName ? '' : s.errorField}
        control={control}
        type={'default'}
        name={'firstName'}
        requiredField
        label={t.myProfile.generalInformation.firstName}
        placeholder={t.myProfile.generalInformation.placeholderFirstName}
      />
      <ControlledTextField
        className={errors.lastName ? '' : s.errorField}
        control={control}
        type={'default'}
        name={'lastName'}
        requiredField
        label={t.myProfile.generalInformation.lastName}
        placeholder={t.myProfile.generalInformation.placeholderLastName}
      />
      <DatePicker
        className={errors.dateOfBirth ? '' : s.errorField}
        control={control}
        name={'dateOfBirth'}
        requiredField
        title={t.myProfile.generalInformation.dateOfBirth}
        error={errors.dateOfBirth}
        placeholder={defaultValue?.dateOfBirth && defaultValue.dateOfBirth}
      />
      <ControlledSelect
        classname={s.field}
        name={'city'}
        options={cities}
        control={control}
        label={t.myProfile.generalInformation.selectYourCity}
        errorMessage={errors.city}
        placeholder={defaultValue?.city ?? t.myProfile.generalInformation.placeholderCity}
      />
      <ControlledTextArea
        name={'aboutMe'}
        control={control}
        label={t.myProfile.generalInformation.aboutMe}
        placeholder={t.myProfile.generalInformation.placeholderAboutMe}
      />
      <Button disabled={!disableButton} type={'submit'} className={s.saveChanges}>
        {t.myProfile.generalInformation.saveChanges}
      </Button>
    </form>
  )
}
