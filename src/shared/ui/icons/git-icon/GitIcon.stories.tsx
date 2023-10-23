import { Meta, StoryObj } from '@storybook/react'

import { GitIcon } from './GitIcon'

const meta = {
  title: 'Components/Icons',
  component: GitIcon,
  tags: ['autodocs'],
} satisfies Meta<typeof GitIcon>

export default meta
type Story = StoryObj<typeof meta>

export const GitIconPic: Story = {}
