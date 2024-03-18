import { Meta, StoryObj } from '@storybook/react'

import { ImageIcon } from './ImageIcon'

const meta = {
  title: 'Components/Icons',
  component: ImageIcon,
  tags: ['autodocs'],
  argTypes: {
    outline: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof ImageIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Image: Story = {}
