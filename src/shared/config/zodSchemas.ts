import { z } from 'zod'

import { LocaleType } from '@/shared/locales'

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
