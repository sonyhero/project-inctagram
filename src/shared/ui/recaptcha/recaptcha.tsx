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
        sitekey={'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'}
        onChange={onRecaptchaChange}
        theme="dark"
        hl={'en-GB'}
        size={'normal'}
      />
    </div>
  )
}
