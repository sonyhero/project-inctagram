import { useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import { useTranslation } from '@/shared/hooks/useTranstaion'
import ru from '@/shared/ui/icons/ru-flag/ru.png'
import en from '@/shared/ui/icons/uk-flag/en.png'
import { SelectBox } from '@/shared/ui/select/SelectBox'

type Locale = 'en' | 'ru'

export const LangSwitcher = () => {
  const { push, pathname, query, asPath, locale } = useRouter()
  const { t } = useTranslation()

  const [lang, setLang] = useState<Locale>(locale as Locale)

  const options = [
    {
      value: 'en',
      img: <Image src={en} alt={'en'} style={{ width: '1.5rem', height: '1.5rem' }} />,
      description: t.header.en,
    },
    {
      value: 'ru',
      img: <Image src={ru} alt={'ru'} style={{ width: '1.5rem', height: '1.5rem' }} />,
      description: t.header.ru,
    },
  ]

  const currentLanguage = options.filter(o => o.value === lang)[0]

  const changeLang = (value: string) => {
    if (currentLanguage.value !== value) {
      setLang(value as Locale)
      push({ pathname, query }, asPath, { locale: value })
    }
  }

  return <SelectBox options={options} onValueChange={changeLang} value={currentLanguage} />
}
