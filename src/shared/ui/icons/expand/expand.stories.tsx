import { Meta, StoryObj } from '@storybook/react'

import { Expand } from './expand'

const meta = {
  title: 'Components/Icons',
  component: Expand,
  tags: ['autodocs'],
} satisfies Meta<typeof Expand>

export default meta
type Story = StoryObj<typeof meta>

export const ExpandIcon: Story = {}
