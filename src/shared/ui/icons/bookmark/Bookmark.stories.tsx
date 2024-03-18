import { Meta, StoryObj } from '@storybook/react'

import { Bookmark } from './Bookmark'

const meta = {
  title: 'Components/Icons',
  component: Bookmark,
  tags: ['autodocs'],
  argTypes: {
    isActive: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Bookmark>

export default meta
type Story = StoryObj<typeof meta>

export const BookmarkIcon: Story = {}
