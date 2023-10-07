import { Meta, StoryObj } from '@storybook/react'

import { Home } from './home'

const meta = {
  title: 'Components/Icons',
  component: Home,
  tags: ['autodocs'],
  argTypes: {
    outline: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Home>

export default meta
type Story = StoryObj<typeof meta>

export const HomeIcon: Story = {}
