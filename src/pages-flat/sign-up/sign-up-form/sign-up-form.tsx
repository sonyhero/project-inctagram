import { DevTool } from '@hookform/devtools'
import { useGoogleLogin } from '@react-oauth/google'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import s from './sign-up-form.module.scss'

import { useGoogleLoginMutation } from '@/features/auth/auth-api'
import { useSignUp } from '@/pages-flat/sign-up/sign-up-form/hooks/use-sign-up'
import { Modal } from '@/shared'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { ControlledCheckbox, ControlledTextField } from '@/shared/ui/controlled'
import { GitIcon, GoogleIcon } from '@/shared/ui/icons'
import { Typography } from '@/shared/ui/typography'

export const SignUpForm = () => {
  const [googleLogin] = useGoogleLoginMutation()
  const router = useRouter()
  const { control, handleSubmitForm, disableButton, emailModal, isOpenModal, setIsOpenModal } =
    useSignUp()

  const closeModal = () => {
    setIsOpenModal(false)
  }

  const onGoogleAuth = useGoogleLogin({
    onSuccess: codeResponse => {
      googleLogin({ code: codeResponse.code })
        .unwrap()
        .then(res => {
          localStorage.setItem('access', res.accessToken)
          router.push('/')
          toast.success('Success')
        })
    },
    flow: 'auth-code',
  })

  const gitHubHandler = () => {
    window.location.assign('https://inctagram.work/api/v1/auth/github/login')
  }

  return (
    <>
      <Card className={s.signBlock}>
        <Typography className={s.title} variant={'h1'}>
          Sign Up
        </Typography>
        <div className={s.iconsWrapper}>
          <Button variant={'text'} className={s.clickToGitAndGoogle} onClick={onGoogleAuth}>
            <GoogleIcon />
          </Button>
          <Button variant={'text'} className={s.clickToGitAndGoogle} onClick={gitHubHandler}>
            <GitIcon />
          </Button>
        </div>
        <form onSubmit={handleSubmitForm}>
          <DevTool control={control} />
          <ControlledTextField
            className={s.userName}
            control={control}
            type={'default'}
            name={'name'}
            label={'User name'}
            placeholder={'enter your username'}
          ></ControlledTextField>
          <ControlledTextField
            className={s.email}
            control={control}
            type={'default'}
            name={'email'}
            label={'Email'}
            placeholder={'enter your email'}
          ></ControlledTextField>
          <ControlledTextField
            className={s.password}
            control={control}
            type={'password'}
            name={'password'}
            label={'Password'}
            placeholder={'enter your password'}
          ></ControlledTextField>
          <ControlledTextField
            className={s.passwordConfirm}
            control={control}
            type={'password'}
            name={'passwordConfirm'}
            label={'Password confirmation'}
            placeholder={'enter your password again'}
          ></ControlledTextField>
          <div className={s.terms}>
            <ControlledCheckbox
              name={'terms'}
              control={control}
              defaultValue={true}
              label={
                <Typography variant={'small'}>
                  I agree to the{' '}
                  <Link href={'/auth/terms-of-service'}>
                    <Typography className={s.link} as={'span'} variant={'s_link'}>
                      Terms of Service
                    </Typography>
                  </Link>{' '}
                  and{' '}
                  <Link href={'/auth/privacy-policy'}>
                    <Typography className={s.link} as={'span'} variant={'s_link'}>
                      Privacy Policy
                    </Typography>
                  </Link>
                </Typography>
              }
            />
          </div>
          <Button disabled={disableButton} className={s.signUpBtn} type={'submit'} fullWidth>
            <Typography variant={'h3'}>Sign Up</Typography>
          </Button>
        </form>
        <Typography className={s.subtitle} variant={'regular16'}>
          Do you have an account?
        </Typography>

        <Link href={'/auth/sign-in'} className={s.signIn}>
          <Button variant={'text'} className={s.signInBtn} fullWidth={true}>
            <Typography variant={'h3'}>Sign In</Typography>
          </Button>
        </Link>
      </Card>
      <Modal
        title={'Email sent'}
        open={isOpenModal}
        onClose={closeModal}
        callBack={closeModal}
        titleSecondButton={'OK'}
        buttonBlockClassName={s.btnBlock}
      >
        <Typography>We have sent a link to confirm your email to {emailModal}</Typography>
      </Modal>
    </>
  )
}
