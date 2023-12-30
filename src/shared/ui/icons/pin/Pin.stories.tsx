import { Meta, StoryObj } from '@storybook/react'

import { Pin } from './Pin'

const meta = {
  title: 'Components/Icons',
  component: Pin,
  tags: ['autodocs'],
  argTypes: {
    outline: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Pin>

export default meta
type Story = StoryObj<typeof meta>

export const PinIcon: Story = {}
