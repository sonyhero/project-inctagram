import { Meta, StoryObj } from '@storybook/react'

import { Heart } from './Heart'

const meta = {
  title: 'Components/Icons',
  component: Heart,
  tags: ['autodocs'],
  argTypes: {
    outline: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Heart>

export default meta
type Story = StoryObj<typeof meta>

export const HeartIcon: Story = {}
