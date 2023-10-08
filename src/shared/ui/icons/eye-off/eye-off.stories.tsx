import { Meta, StoryObj } from '@storybook/react'

import { EyeOff } from './eye-off'

const meta = {
  title: 'Components/Icons',
  component: EyeOff,
  tags: ['autodocs'],
  argTypes: {
    outline: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof EyeOff>

export default meta
type Story = StoryObj<typeof meta>

export const EyeOffIcon: Story = {}
