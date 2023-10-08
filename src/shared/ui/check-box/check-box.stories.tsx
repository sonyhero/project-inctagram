import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { CheckBox } from './check-box'

const meta = {
  title: 'Components/Checkbox',
  component: CheckBox,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'checked changes' },
  },
} satisfies Meta<typeof CheckBox>

export default meta
type Story = StoryObj<typeof meta>

export const ShowCheckbox = () => {
  const [checked, setChecked] = useState<boolean>(false)

  return <CheckBox checked={checked} onChange={() => setChecked(!checked)} />
}

export const DisabledCheckbox: Story = {
  args: {
    checked: true,
    disabled: true,
  },
}

export const CheckboxWithText: Story = {
  args: {
    checked: false,
    label: 'Test',
  },
}

export const DisabledCheckboxWithText: Story = {
  args: {
    checked: false,
    disabled: true,
    label: 'Test',
  },
}
