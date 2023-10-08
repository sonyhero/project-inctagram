import type { Meta, StoryObj } from '@storybook/react'

import { Header } from './header'

const meta = {
  title: 'Widgets/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderComponent: Story = {}
