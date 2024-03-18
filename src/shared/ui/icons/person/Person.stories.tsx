import { Meta, StoryObj } from '@storybook/react'

import { Person } from './Person'

const meta = {
  title: 'Components/Icons',
  component: Person,
  tags: ['autodocs'],
  argTypes: {
    isActive: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Person>

export default meta
type Story = StoryObj<typeof meta>

export const PersonIcon: Story = {}
