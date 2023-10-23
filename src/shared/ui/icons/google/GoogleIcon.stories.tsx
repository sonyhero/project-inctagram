import { Meta, StoryObj } from '@storybook/react'

import { GoogleIcon } from './GoogleIcon'

const meta = {
  title: 'Components/Icons',
  component: GoogleIcon,
  tags: ['autodocs'],
} satisfies Meta<typeof GoogleIcon>

export default meta
type Story = StoryObj<typeof meta>

export const GoogleIconPic: Story = {}
