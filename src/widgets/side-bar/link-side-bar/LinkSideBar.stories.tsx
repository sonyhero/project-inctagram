import type { Meta, StoryObj } from '@storybook/react'

import { LinkSideBar } from './LinkSideBar'

import { PATH } from '@/shared/config/routes'
import { Home } from '@/shared/ui'

const meta = {
  title: 'Components/LinkSideBar',
  component: LinkSideBar,
  tags: ['autodocs'],
} satisfies Meta<typeof LinkSideBar>

export default meta
type Story = StoryObj<typeof meta>

export const LinkSideBarComponent: Story = {
  args: {
    link: PATH.HOME,
    nameLink: 'Home',
    isActiveLink: true,
    children: <Home />,
  },
}
