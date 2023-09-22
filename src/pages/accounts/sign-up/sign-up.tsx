import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './sign-up.module.scss'

import { getBaseLayout } from '@/components/layout/layout'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { CheckBox } from '@/shared/ui/check-box'
import { GitIcon, GoogleIcon } from '@/shared/ui/icons'
import { TextField } from '@/shared/ui/textfield'
import { Typography } from '@/shared/ui/typography'

const sigInSchema = z.object({
  username: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(3),
  passwordConfirm: z.string().min(3),
  terms: z.boolean().default(false),
})

type SignInFormShem = z.infer<typeof sigInSchema>

type Props = {
  onSubmit: (data: SignInFormShem) => void
}

const SignUp = ({ onSubmit }: Props) => {
  const { handleSubmit } = useForm<SignInFormShem>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      terms: false,
    },
    resolver: zodResolver(sigInSchema),
  })
  // @ts-ignore
  const handleSubmitForm = handleSubmit(() => alert('hello')) // FROM TEST

  return (
    <Card className={s.signBlock}>
      <Typography className={s.title} variant="h1">
        Sign Up
      </Typography>
      <div className={s.iconsWrapper}>
        <GoogleIcon />
        <GitIcon />
      </div>
      <form onSubmit={handleSubmitForm}>
        <TextField
          className={s.username}
          type={'default'}
          name={'username'}
          label={'Username'}
          placeholder={'enter your username'}
        ></TextField>
        <TextField
          className={s.email}
          type={'default'}
          name={'email'}
          label={'Email'}
          placeholder={'enter your email'}
        ></TextField>
        <TextField
          className={s.password}
          type={'password'}
          name={'password'}
          label={'Password'}
          placeholder={'enter your password'}
        ></TextField>
        <TextField
          className={s.passwordConfirm}
          type={'password'}
          name={'passwordConfirm'}
          label={'Password confirmation'}
          placeholder={'enter your password again'}
        ></TextField>
        <div className={s.terms}>
          <CheckBox
            name={'terms'} // FROM TEST
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
        <Button className={s.signUpBtn} type={'submit'}>
          Sign Up
        </Button>
      </form>
      <Typography className={s.subtitle} variant={'regular16'}>
        Do you have an account?
      </Typography>
      <Button variant={'text'}>Sign In</Button>
    </Card>
  )
}

export default SignUp
SignUp.getLayout = getBaseLayout
