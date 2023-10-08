import { Meta, StoryObj } from '@storybook/react'

import { Bell } from './bell'

const meta = {
  title: 'Components/Icons',
  component: Bell,
  tags: ['autodocs'],
  argTypes: {
    outline: {
      options: [true, false],
      control: { type: 'radio' },
    },
    withNotification: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Bell>

export default meta
type Story = StoryObj<typeof meta>

export const BellIcon: Story = {}
