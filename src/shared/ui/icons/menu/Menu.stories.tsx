import { Meta, StoryObj } from '@storybook/react'

import { Menu } from './Menu'

const meta = {
  title: 'Components/Icons',
  component: Menu,
  tags: ['autodocs'],
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

export const MenuIcon: Story = {}
