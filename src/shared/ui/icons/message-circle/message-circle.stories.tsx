import { Meta, StoryObj } from '@storybook/react'

import { MessageCircle } from './message-circle'

const meta = {
  title: 'Components/Icons',
  component: MessageCircle,
  tags: ['autodocs'],
  argTypes: {
    outline: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof MessageCircle>

export default meta
type Story = StoryObj<typeof meta>

export const MessageCircleIcon: Story = {}
