import React from 'react'

import ReCAPTCHA from 'react-google-recaptcha'

import s from './recaptcha.module.scss'

type PropsType = {
  onRecaptchaChangeHandler: (token: string | null) => void
}
export const Recaptcha = ({ onRecaptchaChangeHandler }: PropsType) => {
  const onRecaptchaChange = (token: string | null) => {
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
