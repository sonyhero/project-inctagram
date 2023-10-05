import React, { FC } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import s from './create-new-password.module.scss'

import { useNewPasswordMutation } from '@/features/auth/auth-api'
import { Button, Card, ControlledTextField, Typography } from '@/shared'

const createNewPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6)
      .max(20)
      .regex(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!\"#$%&'()*+,-.\/:;<=>?@[\\\]^_`{|}~]).*$/,
        'Password must contain a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~'
      ),
    passwordConfirm: z.string(),
  })
  .refine(data => data.newPassword === data.passwordConfirm, {
    path: ['confirmPassword'],
    message: "Password don't match",
  })

type CreateNewPasswordFormShem = z.infer<typeof createNewPasswordSchema>
type PropsType = {
  recoveryCode: string
}
export const CreateNewPasswordForm: FC<PropsType> = ({ recoveryCode }) => {
  const router = useRouter()
  const [newPassword] = useNewPasswordMutation()
  const { control, handleSubmit, setError } = useForm<CreateNewPasswordFormShem>({
    resolver: zodResolver(createNewPasswordSchema),
  })

  const onSubmit = (data: CreateNewPasswordFormShem) => {
    newPassword({ newPassword: data.newPassword, recoveryCode })
      .unwrap()
      .then(() => {
        toast.success('Success')
        router.push('sign-in')
      })
      .catch(err => {
        err.data.messages.map((el: any) => {
          setError(`${err.data.messages[0].field}` as 'root', {
            type: 'server',
            message: el.message,
          })
        })
      })
  }
  const handleSubmitForm = handleSubmit(onSubmit)

  return (
    <Card className={s.createNewPasswordBlock}>
      <Typography className={s.title} variant={'h1'}>
        Create New Password
      </Typography>
      <form onSubmit={handleSubmitForm}>
        <DevTool control={control} />
        <ControlledTextField
          name={'newPassword'}
          label={'New password'}
          type={'password'}
          placeholder={'enter your password'}
          control={control}
          className={s.password}
        />
        <ControlledTextField
          name={'passwordConfirm'}
          label={'Password confirmation'}
          type={'password'}
          placeholder={'enter your password'}
          control={control}
          className={s.confirmPassword}
        />
        <Typography variant={'regular14'} className={s.formText}>
          Your password must be between 6 and 20 characters
        </Typography>
        <Button fullWidth={true} className={s.submit} type="submit">
          Create new password
        </Button>
      </form>
    </Card>
  )
}
