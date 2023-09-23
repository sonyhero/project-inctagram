import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './sign-up.module.scss'

import { getBaseLayout } from '@/providers/layout/layout'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { ControlledCheckbox, ControlledTextField } from '@/shared/ui/controlled'
import { GitIcon, GoogleIcon } from '@/shared/ui/icons'
import { Typography } from '@/shared/ui/typography'

const sigInSchema = z
  .object({
    username: z.string().min(5),
    email: z.string().email(),
    password: z.string().min(3),
    passwordConfirm: z.string().min(3),
    terms: z.boolean().default(false),
  })
  .refine(data => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: "Password don't match",
  })
  .refine(data => data.terms, {
    path: ['terms'],
    message: 'Confirm terms',
  })

type SignInFormShem = z.infer<typeof sigInSchema>

type Props = {
  onSubmit: (data: SignInFormShem) => void
}

const SignUp = ({ onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<SignInFormShem>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      terms: true,
    },
    resolver: zodResolver(sigInSchema),
  })

  const handleSubmitForm = handleSubmit(onSubmit)

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
        <DevTool control={control} />
        <ControlledTextField
          className={s.username}
          control={control}
          type={'default'}
          name={'username'}
          label={'Username'}
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
        <Button className={s.signUpBtn} type={'submit'} fullWidth>
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
