import { useEffect, useMemo, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import { useTranslation } from '@/shared/hooks/useTranstaion'
import ru from '@/shared/ui/icons/ru-flag/ru.png'
import en from '@/shared/ui/icons/uk-flag/en.png'
import { SelectLang } from '@/shared/ui/select/select-lang'

export const LangSwitcher = () => {
  const { push, pathname, query, asPath, defaultLocale } = useRouter()
  const { t } = useTranslation()

  const [lang, setLang] = useState<'en' | 'ru'>(defaultLocale as 'en' | 'ru')

  const options = [
    {
      id: 'en',
      img: <Image src={en} alt={'en'} style={{ width: '1.5rem', height: '1.5rem' }} />,
      value: t.header.en,
    },
    {
      id: 'ru',
      img: <Image src={ru} alt={'ru'} style={{ width: '1.5rem', height: '1.5rem' }} />,
      value: t.header.ru,
    },
  ]

  useEffect(() => {
    if (lang === 'en') {
      push({ pathname, query }, asPath, { locale: 'en' })
    } else {
      push({ pathname, query }, asPath, { locale: 'ru' })
    }
  }, [lang])

  const languageChange = useMemo(() => {
    if (lang === 'en') {
      return { options: options[1], value: options[0] }
    } else {
      return { options: options[0], value: options[1] }
    }
  }, [lang, t])

  return (
    <SelectLang
      options={[languageChange.options]}
      onValueChange={setLang}
      value={languageChange.value}
    />
  )
}
