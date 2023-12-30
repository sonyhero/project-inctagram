import { Meta, StoryObj } from '@storybook/react'

import { Maximize } from './Maximize'

const meta = {
  title: 'Components/Icons',
  component: Maximize,
  tags: ['autodocs'],
  argTypes: {
    outline: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Maximize>

export default meta
type Story = StoryObj<typeof meta>

export const MaximizeIcon: Story = {}
