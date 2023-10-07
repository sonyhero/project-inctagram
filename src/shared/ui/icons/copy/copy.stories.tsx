import { Meta, StoryObj } from '@storybook/react'

import { Copy } from './copy'

const meta = {
  title: 'Components/Icons',
  component: Copy,
  tags: ['autodocs'],
  argTypes: {
    outline: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Copy>

export default meta
type Story = StoryObj<typeof meta>

export const CopyIcon: Story = {}
