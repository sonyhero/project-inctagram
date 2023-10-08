import { Meta, StoryObj } from '@storybook/react'

import { PauseCircle } from './pause-circle'

const meta = {
  title: 'Components/Icons',
  component: PauseCircle,
  tags: ['autodocs'],
  argTypes: {
    outline: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof PauseCircle>

export default meta
type Story = StoryObj<typeof meta>

export const PauseCircleIcon: Story = {}
