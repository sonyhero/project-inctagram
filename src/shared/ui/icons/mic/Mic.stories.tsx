import { Meta, StoryObj } from '@storybook/react'

import { Mic } from './Mic'

const meta = {
  title: 'Components/Icons',
  component: Mic,
  tags: ['autodocs'],
  argTypes: {
    outline: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Mic>

export default meta
type Story = StoryObj<typeof meta>

export const MicIcon: Story = {}
