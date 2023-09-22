import s from './sign-up.module.scss'

import { getBaseLayout } from '@/components/layout/layout'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { CheckBox } from '@/shared/ui/check-box'
import { GitIcon, Google } from '@/shared/ui/icons'
import { TextField } from '@/shared/ui/textfield'
import { Typography } from '@/shared/ui/typography'

const SignUp = () => {
  return (
    <>
      <Card className={s.signBlock}>
        <Typography className={s.title} variant="h1">
          Sign Up
        </Typography>
        <div className={s.iconsWrapper}>
          <Google />
          <GitIcon />
        </div>
        <TextField
          className={s.username}
          type={'default'}
          label={'Username'}
          placeholder={'enter your username'}
        ></TextField>
        <TextField
          className={s.email}
          type={'default'}
          label={'Email'}
          placeholder={'enter your email'}
        ></TextField>
        <TextField
          className={s.password}
          type={'password'}
          label={'Password'}
          placeholder={'enter your password'}
        ></TextField>
        <TextField
          className={s.passwordConfirm}
          type={'password'}
          label={'Password confirmation'}
          placeholder={'enter your password again'}
        ></TextField>
        <div className={s.terms}>
          <CheckBox
            label={
              <Typography variant={'small'} className={s.termsRow}>
                {'I agree to the'}&nbsp;
                <Typography as={'a'} variant={'small'} href={'#'} className={s.termsLink}>
                  {'Terms of Service'}
                </Typography>
                &nbsp;{'and'}&nbsp;
                <Typography as={'a'} variant={'small'} href={'#'} className={s.termsLink}>
                  {'Privacy Policy'}
                </Typography>
              </Typography>
            }
          />
        </div>
        <Button className={s.signUpBtn}>Sign Up</Button>
        <Typography className={s.subtitle} variant={'regular16'}>
          Do you have an account?
        </Typography>
        <Button variant={'text'}>Sign In</Button>
      </Card>
    </>
  )
}

export default SignUp
SignUp.getLayout = getBaseLayout
