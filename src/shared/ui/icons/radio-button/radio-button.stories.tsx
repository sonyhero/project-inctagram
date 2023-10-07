import { Meta, StoryObj } from '@storybook/react'

import { RadioButton } from './radio-button'

const meta = {
  title: 'Components/Icons',
  component: RadioButton,
  tags: ['autodocs'],
  argTypes: {
    isChecked: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof RadioButton>

export default meta
type Story = StoryObj<typeof meta>

export const RadioButtonIcon: Story = {}
