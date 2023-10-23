import { Meta, StoryObj } from '@storybook/react'

import { ArrowForward } from './ArrowForward'

const meta = {
  title: 'Components/Icons',
  component: ArrowForward,
  tags: ['autodocs'],
} satisfies Meta<typeof ArrowForward>

export default meta
type Story = StoryObj<typeof meta>

export const ArrowForwardIcon: Story = {}
