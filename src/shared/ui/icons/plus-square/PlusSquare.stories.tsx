import { Meta, StoryObj } from '@storybook/react'

import { PlusSquare } from './PlusSquare'

const meta = {
  title: 'Components/Icons',
  component: PlusSquare,
  tags: ['autodocs'],
  argTypes: {
    isActive: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof PlusSquare>

export default meta
type Story = StoryObj<typeof meta>

export const PlusSquareIcon: Story = {}
