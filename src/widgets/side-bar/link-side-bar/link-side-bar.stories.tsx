import type { Meta, StoryObj } from '@storybook/react'

import { LinkSideBar } from './link-side-bar'

import { Home } from '@/shared'

const meta = {
  title: 'Components/LinkSideBar',
  component: LinkSideBar,
  tags: ['autodocs'],
} satisfies Meta<typeof LinkSideBar>

export default meta
type Story = StoryObj<typeof meta>

export const LinkSideBarComponent: Story = {
  args: {
    link: 'home',
    nameLink: 'Home',
    children: <Home />,
  },
}
