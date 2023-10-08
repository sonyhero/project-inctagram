import { Meta, StoryObj } from '@storybook/react'

import { TrendingUp } from './trending-up'

const meta = {
  title: 'Components/Icons',
  component: TrendingUp,
  tags: ['autodocs'],
} satisfies Meta<typeof TrendingUp>

export default meta
type Story = StoryObj<typeof meta>

export const TrendingUpIcon: Story = {}
