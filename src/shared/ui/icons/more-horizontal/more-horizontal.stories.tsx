import { Meta, StoryObj } from '@storybook/react'

import { MoreHorizontal } from './more-horizontal'

const meta = {
  title: 'Components/Icons',
  component: MoreHorizontal,
  tags: ['autodocs'],
} satisfies Meta<typeof MoreHorizontal>

export default meta
type Story = StoryObj<typeof meta>

export const MoreHorizontalIcon: Story = {}
