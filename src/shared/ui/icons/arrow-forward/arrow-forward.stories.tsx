import { Meta, StoryObj } from '@storybook/react'

import { ArrowForward } from './arrow-forward'

const meta = {
  title: 'Components/Icons',
  component: ArrowForward,
  tags: ['autodocs'],
} satisfies Meta<typeof ArrowForward>

export default meta
type Story = StoryObj<typeof meta>

export const ArrowForwardIcon: Story = {}
