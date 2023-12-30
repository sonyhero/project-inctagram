import { Meta, StoryObj } from '@storybook/react'

import { PersonRemove } from './PersonRemove'

const meta = {
  title: 'Components/Icons',
  component: PersonRemove,
  tags: ['autodocs'],
  argTypes: {
    outline: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof PersonRemove>

export default meta
type Story = StoryObj<typeof meta>

export const PersonRemoveIcon: Story = {}
