import { useState } from 'react'

import Image from 'next/image'

import { SelectBox } from '@/shared'
import ru from '@/shared/ui/icons/ru-flag/ru.png'
import en from '@/shared/ui/icons/uk-flag/en.png'

export const LangSwitcher = () => {
  const [lang, setLang] = useState<'en' | 'ru'>('en')

  const options = [
    {
      id: 'en',
      img: <Image src={en} alt={'en'} style={{ width: '1.5rem', height: '1.5rem' }} />,
      value: 'English',
    },
    {
      id: 'ru',
      img: <Image src={ru} alt={'ru'} style={{ width: '1.5rem', height: '1.5rem' }} />,
      value: 'Russian',
    },
  ]

  const languageChange = () => {
    if (lang === 'en') {
      return { options: options[1], value: options[0] }
    } else return { options: options[0], value: options[1] }
  }

  return (
    <SelectBox
      options={[languageChange().options]}
      onValueChange={setLang}
      value={languageChange().value}
    />
  )
}
