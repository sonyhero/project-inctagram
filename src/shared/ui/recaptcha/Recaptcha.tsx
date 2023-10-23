import React from 'react'

import ReCAPTCHA from 'react-google-recaptcha'

import s from './Recaptcha.module.scss'

import { Nullable } from '@/shared/types'

type PropsType = {
  onRecaptchaChangeHandler: (token: Nullable<string>) => void
}
export const Recaptcha = ({ onRecaptchaChangeHandler }: PropsType) => {
  const onRecaptchaChange = (token: Nullable<string>) => {
    onRecaptchaChangeHandler(token)
  }

  return (
    <div className={s.block}>
      <ReCAPTCHA
        sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_API_KEY as string}`}
        onChange={onRecaptchaChange}
        theme={'dark'}
        hl={'en-GB'}
        size={'normal'}
      />
    </div>
  )
}
