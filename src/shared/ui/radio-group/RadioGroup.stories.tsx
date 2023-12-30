import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroupDemo } from '@/shared/ui/radio-group/RadioGroup'

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroupDemo,
  tags: ['autodocs'],
  argTypes: { onChangeOption: { action: 'radio changes' } },
} satisfies Meta<typeof RadioGroupDemo>

const people = [
  { id: 1, value: 'Durward Reynolds' },
  { id: 2, value: 'Kenton Towne' },
  { id: 3, value: 'Therese Wunsch' },
  { id: 4, value: 'Benedict Kessler' },
  { id: 5, value: 'Katelyn Rohan' },
]

export default meta
type Story = StoryObj<typeof meta>

export const ShowRadioGroupActive: Story = {
  args: {
    options: people,
    isDisabled: false,
  },
}

export const ShowRadioGroupNotActive: Story = {
  args: {
    isDisabled: true,
    options: people,
  },
}
