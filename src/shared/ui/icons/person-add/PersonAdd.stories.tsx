import { Meta, StoryObj } from '@storybook/react'

import { PersonAdd } from './PersonAdd'

const meta = {
  title: 'Components/Icons',
  component: PersonAdd,
  tags: ['autodocs'],
  argTypes: {
    outline: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof PersonAdd>

export default meta
type Story = StoryObj<typeof meta>

export const PersonAddIcon: Story = {}
