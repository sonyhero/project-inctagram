import { DevTool } from '@hookform/devtools'
import Link from 'next/link'

import s from './sign-up-form.module.scss'

import { useSignUp } from '@/features/auth/ui/sign-up-form/hooks'
import { useThirdPartyAuth } from '@/shared/hooks'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import {
  Button,
  Card,
  ControlledCheckbox,
  ControlledTextField,
  GitIcon,
  GoogleIcon,
  Modal,
  Typography,
} from '@/shared/ui'

export const SignUpForm = () => {
  const { onGitHubAuth, onGoogleAuth } = useThirdPartyAuth()
  const { control, handleSubmitForm, disableButton, emailModal, isOpenModal, setIsOpenModal } =
    useSignUp()
  const { t } = useTranslation()

  const closeModal = () => {
    setIsOpenModal(false)
  }

  return (
    <>
      <Card className={s.signBlock}>
        <Typography className={s.title} variant={'h1'}>
          {t.auth.signUp.signUp}
        </Typography>
        <div className={s.iconsWrapper}>
          <Button variant={'text'} className={s.clickToGitAndGoogle} onClick={onGoogleAuth}>
            <GoogleIcon />
          </Button>
          <Button variant={'text'} className={s.clickToGitAndGoogle} onClick={onGitHubAuth}>
            <GitIcon />
          </Button>
        </div>
        <form onSubmit={handleSubmitForm}>
          <DevTool control={control} />
          <ControlledTextField
            className={s.userName}
            control={control}
            type={'default'}
            name={'userName'}
            label={t.auth.signUp.userName}
            placeholder={t.auth.signUp.userNamePlaceholder}
          ></ControlledTextField>
          <ControlledTextField
            className={s.email}
            control={control}
            type={'default'}
            name={'email'}
            label={t.auth.signUp.email}
            placeholder={t.auth.signUp.emailPlaceholder}
          ></ControlledTextField>
          <ControlledTextField
            className={s.password}
            control={control}
            type={'password'}
            name={'password'}
            label={t.auth.signUp.password}
            placeholder={t.auth.signUp.passwordPlaceholder}
          ></ControlledTextField>
          <ControlledTextField
            className={s.passwordConfirm}
            control={control}
            type={'password'}
            name={'passwordConfirm'}
            label={t.auth.signUp.passwordConfirmation}
            placeholder={t.auth.signUp.passwordConfirmationPlaceholder}
          ></ControlledTextField>
          <div className={s.terms}>
            <ControlledCheckbox
              name={'terms'}
              control={control}
              defaultValue={true}
              label={
                <Typography variant={'small'}>
                  {t.auth.signUp.checkboxOneChart}{' '}
                  <Link href={'/auth/terms-of-service'}>
                    <Typography className={s.link} as={'span'} variant={'s_link'}>
                      {t.auth.signUp.termsOfService}
                    </Typography>
                  </Link>{' '}
                  {t.auth.signUp.checkboxTwoChart}{' '}
                  <Link href={'/auth/privacy-policy'}>
                    <Typography className={s.link} as={'span'} variant={'s_link'}>
                      {t.auth.signUp.privacyPolicy}
                    </Typography>
                  </Link>
                </Typography>
              }
            />
          </div>
          <Button disabled={disableButton} className={s.signUpBtn} type={'submit'} fullWidth>
            <Typography variant={'h3'}>{t.auth.signUp.signUp}</Typography>
          </Button>
        </form>
        <Typography className={s.subtitle} variant={'regular16'}>
          {t.auth.signUp.question}
        </Typography>

        <Link href={'/auth/sign-in'} className={s.signIn}>
          <Button variant={'text'} className={s.signInBtn} fullWidth={true}>
            <Typography variant={'h3'}>{t.auth.signUp.signIn}</Typography>
          </Button>
        </Link>
      </Card>
      <Modal
        title={t.auth.signUp.modal}
        open={isOpenModal}
        onClose={closeModal}
        callBack={closeModal}
        titleSecondButton={'OK'}
        buttonBlockClassName={s.btnBlock}
      >
        <Typography>
          {t.auth.signUp.modalDescription} {emailModal}
        </Typography>
      </Modal>
    </>
  )
}
