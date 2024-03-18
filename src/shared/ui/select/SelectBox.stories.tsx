import type { Meta, StoryObj } from '@storybook/react'

import { ControlledSelect } from '@/shared/ui/controlled/controlled-select/ControlledSelect'

const meta = {
  title: 'Components/SelectBox',
  component: ControlledSelect,
  tags: ['autodocs'],
  argTypes: { onValueChange: { action: 'select changes' } },
} satisfies Meta<typeof ControlledSelect>

export default meta
type Story = StoryObj<typeof meta>

const people = [
  { id: '1', value: 'Durward Reynolds' },
  { id: '2', value: 'Kenton Towne' },
  { id: '3', value: 'Therese Wunsch' },
  { id: '4', value: 'Benedict Kessler' },
  { id: '5', value: 'Katelyn Rohan' },
]

export const SelectStory: Story = {
  args: {
    label: 'Select',
    placeholder: 'Select item',
    disabled: false,
    options: people,
    value: people[1].value,
  },
}

export const SelectStoryDisabled: Story = {
  args: {
    label: 'Select',
    placeholder: 'Select item',
    disabled: true,
    options: people,
    value: people[1].value,
  },
}
