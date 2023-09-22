import s from './sign-up.module.scss'

import { getBaseLayout } from '@/components/layout/layout'
import { Card } from '@/shared/ui/card'
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
          className={s.password}
          type={'password'}
          label={'Password confirmation'}
          placeholder={'enter your password again'}
        ></TextField>
      </Card>
    </>
  )
}

export default SignUp
SignUp.getLayout = getBaseLayout
