import Link from 'next/link'

import s from './ForgotPasswordForm.module.scss'

import { useForgotPassword } from '@/features/auth/ui/forgot-password-form/hooks/useForgotPassword'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { Button, Card, ControlledTextField, Modal, Recaptcha, Typography } from '@/shared/ui'

export const ForgotPasswordForm = () => {
  const {
    control,
    email,
    routerHandler,
    openModal,
    onCloseModalHandler,
    onRecaptchaChangeHandler,
    handleSubmitForm,
  } = useForgotPassword()
  const { t } = useTranslation()

  return (
    <Card className={s.forgotPasswordBlock}>
      <Typography className={s.title} variant={'h1'}>
        {t.auth.forgotPassword.forgotPassword}
      </Typography>
      <form onSubmit={handleSubmitForm} className={s.formBlock}>
        <ControlledTextField
          name={'email'}
          label={t.auth.forgotPassword.email}
          type={'default'}
          placeholder={'Epam@epam.com'}
          control={control}
          className={s.email}
        />
        <Typography variant={'regular14'} className={s.text}>
          {t.auth.forgotPassword.description}{' '}
        </Typography>
        <Button fullWidth={true} className={s.submit} type="submit">
          {t.auth.forgotPassword.sendLink}
        </Button>
        <Button variant={'text'}>
          <Link href={'/auth/sign-in'} className={s.backBtn}>
            {t.auth.forgotPassword.backToSignIn}
          </Link>
        </Button>
        <Recaptcha onRecaptchaChangeHandler={onRecaptchaChangeHandler} />
      </form>
      <Modal
        title={t.auth.forgotPassword.modal}
        open={openModal}
        onClose={onCloseModalHandler}
        titleSecondButton={'OK'}
        buttonBlockClassName={s.buttonBlock}
        callBack={routerHandler}
      >
        {t.auth.forgotPassword.modalDescription} {email}
      </Modal>
    </Card>
  )
}
