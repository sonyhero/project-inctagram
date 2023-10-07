import { Meta, StoryObj } from '@storybook/react'

import { Image } from './image'

const meta = {
  title: 'Components/Icons',
  component: Image,
  tags: ['autodocs'],
  argTypes: {
    outline: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Image>

export default meta
type Story = StoryObj<typeof meta>

export const ImageIcon: Story = {}
