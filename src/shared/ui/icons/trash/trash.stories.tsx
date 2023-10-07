import { Meta, StoryObj } from '@storybook/react'

import { Trash } from './trash'

const meta = {
  title: 'Components/Icons',
  component: Trash,
  tags: ['autodocs'],
  argTypes: {
    outline: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Trash>

export default meta
type Story = StoryObj<typeof meta>

export const TrashIcon: Story = {}
