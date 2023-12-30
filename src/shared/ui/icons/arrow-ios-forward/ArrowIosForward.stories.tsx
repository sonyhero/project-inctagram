import { Meta, StoryObj } from '@storybook/react'

import { ArrowIosForward } from './ArrowIosForward'

const meta = {
  title: 'Components/Icons',
  component: ArrowIosForward,
  tags: ['autodocs'],
} satisfies Meta<typeof ArrowIosForward>

export default meta
type Story = StoryObj<typeof meta>

export const ArrowIosForwardIcon: Story = {}
