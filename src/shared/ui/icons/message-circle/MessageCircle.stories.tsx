import { Meta, StoryObj } from '@storybook/react'

import { MessageCircle } from './MessageCircle'

const meta = {
  title: 'Components/Icons',
  component: MessageCircle,
  tags: ['autodocs'],
  argTypes: {
    isActive: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof MessageCircle>

export default meta
type Story = StoryObj<typeof meta>

export const MessageCircleIcon: Story = {}
