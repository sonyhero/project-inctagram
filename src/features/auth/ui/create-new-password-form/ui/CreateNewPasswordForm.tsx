import React from 'react'

import { DevTool } from '@hookform/devtools'

import s from './CreateNewPasswordForm.module.scss'

import { useCreateNewPassword } from '@/features/auth/ui/create-new-password-form/hooks/useCreateNewPassword'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { Button, Card, ControlledTextField, Typography } from '@/shared/ui'

type Props = {
  recoveryCode: string
}

export const CreateNewPasswordForm = ({ recoveryCode }: Props) => {
  const { handleSubmitForm, control } = useCreateNewPassword(recoveryCode)
  const { t } = useTranslation()

  return (
    <Card className={s.createNewPasswordBlock}>
      <Typography className={s.title} variant={'h1'}>
        {t.auth.createNewPassword.createNewPassword}
      </Typography>
      <form onSubmit={handleSubmitForm}>
        <DevTool control={control} />
        <ControlledTextField
          name={'newPassword'}
          label={t.auth.createNewPassword.newPassword}
          type={'password'}
          placeholder={t.auth.createNewPassword.newPasswordPlaceholder}
          control={control}
          className={s.password}
        />
        <ControlledTextField
          name={'passwordConfirm'}
          label={t.auth.createNewPassword.passwordConfirmation}
          type={'password'}
          placeholder={t.auth.createNewPassword.passwordConfirmationPlaceholder}
          control={control}
          className={s.confirmPassword}
        />
        <Typography variant={'regular14'} className={s.formText}>
          {t.auth.createNewPassword.description}
        </Typography>
        <Button fullWidth={true} className={s.submit} type={'submit'}>
          {t.auth.createNewPassword.createNewPassword}
        </Button>
      </form>
    </Card>
  )
}
