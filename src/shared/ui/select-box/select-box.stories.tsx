import type { Meta, StoryObj } from '@storybook/react'

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
