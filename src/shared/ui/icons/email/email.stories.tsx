import { Meta, StoryObj } from '@storybook/react'

import { Email } from './email'

const meta = {
  title: 'Components/Icons',
  component: Email,
  tags: ['autodocs'],
  argTypes: {
    outline: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Email>

export default meta
type Story = StoryObj<typeof meta>

export const EmailIcon: Story = {}
