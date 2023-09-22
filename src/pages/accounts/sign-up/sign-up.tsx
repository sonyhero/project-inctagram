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
        <Typography variant="h1">Sign Up</Typography>
        <div className={s.iconsWrapper}>
          <Google />
          <GitIcon />
        </div>
        <TextField
          type={'default'}
          label={'Username'}
          placeholder={'enter your username'}
        ></TextField>
        <TextField type={'default'} label={'Email'} placeholder={'enter your email'}></TextField>
        <TextField
          type={'default'}
          label={'Password'}
          placeholder={'enter your password'}
        ></TextField>
        <TextField
          type={'default'}
          label={'Password confirmation'}
          placeholder={'enter your password again'}
        ></TextField>
      </Card>
    </>
  )
}

export default SignUp
SignUp.getLayout = getBaseLayout
