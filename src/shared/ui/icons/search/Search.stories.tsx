import { Meta, StoryObj } from '@storybook/react'

import { Search } from './Search'

const meta = {
  title: 'Components/Icons',
  component: Search,
  tags: ['autodocs'],
} satisfies Meta<typeof Search>

export default meta
type Story = StoryObj<typeof meta>

export const SearchIcon: Story = {}
