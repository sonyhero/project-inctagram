import { z } from 'zod'

import { FIRST_LAST_NAME_REGEX, USER_NAME_REGEX } from '@/shared/config/regex'
import { LocaleType } from '@/shared/locales'

export const _getZodUserName = (t: LocaleType) => {
  const length = {
    min: 6,
    max: 30,
  }

  return z
    .string()
    .min(length.min, `${t.zodSchema.minNumberOfCharacters} ${length.min}`)
    .max(length.max, `${t.zodSchema.maxNumberOfCharacters} ${length.max}`)
    .regex(USER_NAME_REGEX, t.zodSchema.userNameRegex)
}

export const _getZodFirsLastName = (t: LocaleType) => {
  const length = {
    min: 1,
    max: 50,
  }

  return z
    .string()
    .min(length.min, `${t.zodSchema.minNumberOfCharacters} ${length.min}`)
    .max(length.max, `${t.zodSchema.maxNumberOfCharacters} ${length.max}`)
    .regex(FIRST_LAST_NAME_REGEX, t.zodSchema.firstLastNameRegex)
}

export const getZodSchema = (args: GetZodSchemaType) => {
  const { t, regex, regexMessage, lengthMin, lengthMax } = args

  return z
    .string()
    .min(lengthMin, `${t.zodSchema.minNumberOfCharacters} ${lengthMin}`)
    .max(lengthMax, `${t.zodSchema.maxNumberOfCharacters} ${lengthMax}`)
    .regex(regex, regexMessage)
}

type GetZodSchemaType = {
  t: LocaleType
  regex: RegExp
  regexMessage: string
  lengthMin: number
  lengthMax: number
}
