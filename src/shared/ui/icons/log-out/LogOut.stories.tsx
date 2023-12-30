import { Meta, StoryObj } from '@storybook/react'

import { LogOut } from './LogOut'

const meta = {
  title: 'Components/Icons',
  component: LogOut,
  tags: ['autodocs'],
} satisfies Meta<typeof LogOut>

export default meta
type Story = StoryObj<typeof meta>

export const LogOutIcon: Story = {}
