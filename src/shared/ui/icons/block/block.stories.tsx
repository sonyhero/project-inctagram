import { Meta, StoryObj } from '@storybook/react'

import { Block } from './block'

const meta = {
  title: 'Components/Icons',
  component: Block,
  tags: ['autodocs'],
} satisfies Meta<typeof Block>

export default meta
type Story = StoryObj<typeof meta>

export const BlockIcon: Story = {}
