import { Meta, StoryObj } from '@storybook/react'

import { PlusSquare } from './plus-square'

const meta = {
  title: 'Components/Icons',
  component: PlusSquare,
  tags: ['autodocs'],
  argTypes: {
    outline: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof PlusSquare>

export default meta
type Story = StoryObj<typeof meta>

export const PlusSquareIcon: Story = {}
