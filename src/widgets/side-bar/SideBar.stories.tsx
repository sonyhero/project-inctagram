import type { Meta, StoryObj } from '@storybook/react'

import { SideBar } from './SideBar'

const meta = {
  title: 'Widgets/SideBar',
  component: SideBar,
  tags: ['autodocs'],
} satisfies Meta<typeof SideBar>

export default meta
type Story = StoryObj<typeof meta>

export const SideBarComponent: Story = {}
