import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { useNewPasswordMutation } from '@/features/auth'

const createNewPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6)
      .max(20)
      .regex(
        /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_{|}~])[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_{|}~]+$/,
        'Password must contain a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~'
      ),
    passwordConfirm: z.string(),
  })
  .refine(data => data.newPassword === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: "Password don't match",
  })

type CreateNewPasswordFormShem = z.infer<typeof createNewPasswordSchema>

export const useCreateNewPassword = (recoveryCode: string) => {
  const [newPassword] = useNewPasswordMutation()
  const router = useRouter()
  const { control, handleSubmit, setError } = useForm<CreateNewPasswordFormShem>({
    resolver: zodResolver(createNewPasswordSchema),
    mode: 'onBlur',
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

  return { handleSubmitForm, control }
}
