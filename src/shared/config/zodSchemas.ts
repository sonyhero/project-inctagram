import { z } from 'zod'

import { LocaleType } from '@/shared/locales'

export const getZodSchema = (args: GetZodSchemaType) => {
  const { t, stringRequiredMessage, regex, regexMessage, lengthMin, lengthMax } = args

  return z
    .string({ required_error: stringRequiredMessage })
    .min(lengthMin, `${t.zodSchema.minNumberOfCharacters} ${lengthMin}`)
    .max(lengthMax, `${t.zodSchema.maxNumberOfCharacters} ${lengthMax}`)
    .regex(regex, regexMessage)
}

type GetZodSchemaType = {
  t: LocaleType
  stringRequiredMessage?: string
  regex: RegExp
  regexMessage: string
  lengthMin: number
  lengthMax: number
}
