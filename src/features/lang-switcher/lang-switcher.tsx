import { useMemo, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import { useTranslation } from '@/shared/hooks/useTranstaion'
import ru from '@/shared/ui/icons/ru-flag/ru.png'
import en from '@/shared/ui/icons/uk-flag/en.png'
import { SelectLang } from '@/shared/ui/select/select-lang'

export const LangSwitcher = () => {
  const { push, pathname, query, asPath, locale } = useRouter()
  const { t } = useTranslation()

  const [lang, setLang] = useState<'en' | 'ru'>(locale as 'en' | 'ru')

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

  const languageChange = useMemo(() => {
    if (lang === 'en') {
      return { options: options[1], value: options[0] }
    } else {
      return { options: options[0], value: options[1] }
    }
  }, [lang, t])

  const changeLang = (value: string) => {
    if (value === 'en') {
      setLang('en')
      push({ pathname, query }, asPath, { locale: 'en' })
    } else {
      setLang('ru')
      push({ pathname, query }, asPath, { locale: 'ru' })
    }
  }

  return (
    <SelectLang
      options={[languageChange.options]}
      onValueChange={changeLang}
      value={languageChange.value}
    />
  )
}
