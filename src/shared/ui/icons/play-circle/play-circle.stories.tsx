import { Meta, StoryObj } from '@storybook/react'

import { PlayCircle } from './play-circle'

const meta = {
  title: 'Components/Icons',
  component: PlayCircle,
  tags: ['autodocs'],
  argTypes: {
    outline: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof PlayCircle>

export default meta
type Story = StoryObj<typeof meta>

export const PlayCircleIcon: Story = {}
