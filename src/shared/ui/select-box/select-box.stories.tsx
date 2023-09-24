import type { Meta, StoryObj } from '@storybook/react'
import Image from 'next/image'

import ru from '../icons/ru-flag/ru.png'
import en from '../icons/uk-flag/en.png'

import { SelectBox } from './select-box'

const meta = {
  title: 'Components/Select',
  component: SelectBox,
  tags: ['autodocs'],
  argTypes: { onValueChange: { action: 'select changes' } },
} satisfies Meta<typeof SelectBox>

export default meta
type Story = StoryObj<typeof meta>

const people = [
  { value: '1', label: 'Durward Reynolds' },
  { value: '2', label: 'Kenton Towne' },
  { value: '3', label: 'Therese Wunsch' },
  { value: '4', label: 'Benedict Kessler' },
  { value: '5', label: 'Katelyn Rohan' },
]

export const SelectStory: Story = {
  args: {
    label: 'Select',
    placeholder: 'Select item',
    disabled: false,
    options: people,
  },
}

export const SelectStoryDisabled: Story = {
  args: {
    label: 'Select',
    placeholder: 'Select item',
    disabled: true,
    options: people,
  },
}

const languages = [
  {
    value: 'English',
    img: <Image src={en} alt={'en'} style={{ width: '1.5rem', height: '1.5rem' }} />,
  },
  {
    value: 'Russian',
    img: <Image src={ru} alt={'ru'} style={{ width: '1.5rem', height: '1.5rem' }} />,
  },
]

export const SelectLangSwitcher: Story = {
  args: {
    label: 'Select',
    placeholder: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.62rem' }}>
        <Image style={{ width: '1.5rem', height: '1.5rem' }} src={en} alt={'en'} />
        {languages[0].value}
      </div>
    ),
    options: languages,
  },
}
