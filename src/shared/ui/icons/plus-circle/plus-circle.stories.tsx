import { Meta, StoryObj } from '@storybook/react'

import { PlusCircle } from './plus-circle'

const meta = {
  title: 'Components/Icons',
  component: PlusCircle,
  tags: ['autodocs'],
  argTypes: {
    outline: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof PlusCircle>

export default meta
type Story = StoryObj<typeof meta>

export const PlusCircleIcon: Story = {}
